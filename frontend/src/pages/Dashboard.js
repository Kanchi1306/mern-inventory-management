import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../api/product";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./Dashboard.css";

const LOW_STOCK_LIMIT = 5;

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });

      setForm({ name: "", quantity: "", price: "" });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Chart Data
  const chartData = products.map((p) => ({
    name: p.name,
    quantity: Number(p.quantity),
    price: Number(p.price),
  }));

  const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#f59e0b", "#7c3aed"];

  return (
    <div className="container">
      <h2>Inventory Dashboard</h2>
      <button className="logout" onClick={logout}>
        Logout
      </button>

      {/* Create Product */}
      <h3>Create Product</h3>
      <form onSubmit={handleCreate}>
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button className="primary" type="submit">
          Add Product
        </button>
      </form>

      <hr />

      {/* Product List */}
      <h3>Your Products</h3>

      {products.length === 0 ? (
        <p>No products yet</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            className={`product ${
              p.quantity < LOW_STOCK_LIMIT ? "low-stock" : ""
            }`}
          >
            <span>
              <b>{p.name}</b> — Qty: {p.quantity} — ₹{p.price}
              {p.quantity < LOW_STOCK_LIMIT && (
                <span className="warning"> ⚠ Low Stock</span>
              )}
            </span>

            <button
              className="danger"
              onClick={() => handleDelete(p._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <hr />

      {/* Charts */}
      {products.length > 0 && (
        <>
          <h3>Inventory Analytics</h3>

          {/* Bar Chart */}
          <h4>Stock Quantity Overview</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>

          <br />

          {/* Pie Chart */}
          <h4>Price Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="price"
                nameKey="name"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default Dashboard;
