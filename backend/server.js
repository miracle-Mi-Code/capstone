// 🛠️ DNS resolution fix for specific Windows/Node local connections
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// API Namespace endpoints
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// 1. Instruct Express to serve all compiled React assets from the frontend folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 🛠️ EXPRESS v5 CATCH-ALL PATCH:
// Changing from "*" to "/{*splat}" names the wildcard parameter.
// The curly braces {} ensure it catches the root "/" URL as well as deep client paths (like /cart or /admin).
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Custom Global Error Handler (Must remain below routes to capture downstream exceptions)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`MarketMeld Backend Core Online on Port ${PORT}`),
);
