const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");

dotenv.config();

// Connect to MongoDB Cluster
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🎒 Seeder connected to MongoDB cluster..."))
  .catch((err) => console.error("Database connection failed:", err));

const importData = async () => {
  try {
    // 1. Clear out any existing products
    await Product.deleteMany();
    console.log("🧹 Old catalog matrix wiped clean.");

    // 2. Find a valid user to attach as the product owner/artisan
    let artisanUser =
      (await User.findOne({ role: "artisan" })) || (await User.findOne());

    // Fallback: Provision a seed account if the DB collection is completely empty
    if (!artisanUser) {
      console.log(
        "👤 No users found in database. Provisioning a seed artisan profile...",
      );
      artisanUser = await User.create({
        name: "Master Artisan",
        email: "artisan@marketmeld.com",
        password: "password123",
        role: "artisan",
      });
    }

    // 3. Define sample products using your exact schema keys
    const sampleProducts = [
      {
        name: "Handwoven Kente Fabric",
        description:
          "Authentic, vibrant multi-colored traditional Ghanaian Kente cloth, woven by master craftsmen.",
        price: 45.0,
        stock: 12,
        category: "Textiles",
        imageUrl:
          "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=500",
        artisan: artisanUser._id,
      },
      {
        name: "Gourmet West African Spice Blend",
        description:
          "A rich, organic blend of traditional spices curated for authentic local dishes.",
        price: 14.99,
        stock: 45,
        category: "Food",
        imageUrl:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500",
        artisan: artisanUser._id,
      },
      {
        name: "Hand-Carved Mahogany Sculpture",
        description:
          "Traditional decorative desk mask sculpted carefully from premium local mahogany timber.",
        price: 65.0,
        stock: 5,
        category: "Artisan",
        imageUrl:
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500",
        artisan: artisanUser._id,
      },
      {
        name: "Traditional Beaded Statement Necklace",
        description:
          "Intricately detailed beadwork necklace handmade locally using sustainable artisan glass elements.",
        price: 32.5,
        stock: 8,
        category: "Jewelry",
        imageUrl:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
        artisan: artisanUser._id,
      },
    ];

    // 4. Inject into MongoDB
    await Product.insertMany(sampleProducts);
    console.log(
      "🚀 Artisan product catalog successfully seeded into database!",
    );

    process.exit();
  } catch (error) {
    console.error("❌ Import Failure:", error.message);
    process.exit(1);
  }
};

importData();
