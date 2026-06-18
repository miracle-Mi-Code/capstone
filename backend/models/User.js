const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "artisan", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);

// 🛠️ FIXED: Purely promise-based hook. No 'next' parameter or next() calls.
userSchema.pre("save", async function () {
  // If the password wasn't modified, stop execution early
  if (!this.isModified("password")) return;

  // Hash the password cleanly using modern async/await syntax
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // No next() needed! Mongoose proceeds as soon as this function resolves.
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
