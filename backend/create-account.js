const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema structure definition
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function run() {
  console.log("Connecting directly to your live cluster0.hf1pbsi cluster...");

  if (!process.env.MONGO_URI) {
    console.error(
      "❌ Error: MONGO_URI is missing from your backend/.env file.",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "✅ Successfully authenticated firewall handshake with MongoDB Atlas!",
    );

    const developerEmail = "ibrahim.miracle@marketmeld.com";
    const rawPassword = "MarketMeldPassword2026!";

    // Wipe any previous broken collection configurations
    await User.deleteOne({ email: developerEmail });

    // Hash password automatically for strict authorization layer compliance
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    // Create the master profile
    await User.create({
      name: "Ibrahim Miracle",
      email: developerEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("\n🚀 MarketMeld Engine Account Successfully Configured!");
    console.log("-----------------------------------------------------");
    console.log(`Developer Name:  Ibrahim Miracle`);
    console.log(`Username/Email:  ${developerEmail}`);
    console.log(`Secure Password: ${rawPassword}`);
    console.log("-----------------------------------------------------");
    console.log(
      "You can now enter these exact credentials into your React app login screen!\n",
    );

    process.exit();
  } catch (error) {
    console.error("❌ Database script injection failed:", error.message);
    process.exit(1);
  }
}

run();
