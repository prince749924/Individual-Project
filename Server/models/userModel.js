const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    role:{
        type: String,
        default: "user"
    },
    status:{
        type: String,
        default: "active"
    },
    profilePicture:{
        type:String,
        default:""
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);
module.exports = User;