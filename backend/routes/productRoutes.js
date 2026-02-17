const express = require("express");
const Product = require("../models/product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products of logged-in user
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    if (!name || quantity == null || price == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (quantity < 0) {
      return res
        .status(400)
        .json({ message: "Quantity cannot be negative" });
    }

    const product = await Product.create({
      name,
      quantity,
      price,
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Private (owner only)
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ownership check
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (quantity != null && quantity < 0) {
      return res
        .status(400)
        .json({ message: "Quantity cannot be negative" });
    }

    if (name !== undefined) product.name = name;
    if (quantity !== undefined) product.quantity = quantity;
    if (price !== undefined) product.price = price;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private (owner only)
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ownership check
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
