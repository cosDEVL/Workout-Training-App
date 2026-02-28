const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  tokenVersion: {
    type: Number,
    default: 0,
    required: true,
    select: false,
  },
  username: {
    type: String,
    required: [true, "Insert username"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password length must be higher than 8 chars"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm the password"],
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: "Insert a valid password",
    },
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  },
  resetToken: String,
  passwordChangedAt: Date,
  passwordExpiresAt: Date,
});

// Prima di salvare il documento, viene eseguito salting&hashing della password inviata in chiaro
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  // hashing con cost factor 12. totali iterazioni in questo caso 4096. 2^12
  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.revokeToken = async function () {
  this.tokenVersion += 1;

  await this.save({ validateBeforeSave: false });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
