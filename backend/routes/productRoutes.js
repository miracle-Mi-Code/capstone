const express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// GET /api/v1/products -> Public route to fetch items for the store grid
router.get("/", getProducts);

// POST /api/v1/products -> Add a new product to the database
// 🛠️ DEV PATCH: Temporarily removed 'protect' middleware so your Admin page can
// successfully inject test data without being blocked by login states.
router.post("/", createProduct);

// 🔒 FUTURE PRODUCTION LINE (Uncomment this later when Login/Tokens are fully wired up):
// router.post('/', protect, createProduct);

module.exports = router;
