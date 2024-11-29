const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
      password: await bcrypt.hash(password, 10),
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
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      "secret_key",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      success: true,
      msg: "User logged in successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login};
