const User = require("../model/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body)
    const user = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (user) {
      return res.status(409).json({
        success: false,
        msg: "User already exists",
      });
    }
    const newUser = await User({
        name,
        email,
        password: await bcrypt.hash(password, 10), // Hash the password before saving
      });
  
    const result = await newUser.save();

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { register, login };
