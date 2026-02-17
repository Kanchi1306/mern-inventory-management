const express = require("express");
const Transaction = require("../models/Transaction");
const Product = require("../models/product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET all transactions for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate("product", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE transaction (IN / OUT)
router.post("/", protect, async (req, res) => {
  try {
    const { productId, type, quantity } = req.body;

    if (!productId || !type || !quantity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ownership check
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (type === "OUT" && product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Update product stock
    product.quantity =
      type === "IN"
        ? product.quantity + quantity
        : product.quantity - quantity;

    await product.save();

    const transaction = await Transaction.create({
      product: productId,
      user: req.user._id,
      type,
      quantity,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
