const User = require("../model/User");

const updateCart = async (req, res) => {
  const { email, cart_items } = req.body;
  try {
    if (!email || !cart_items) {
      return res.status(400).json({
        success: false,
        error: "Email and cart_items are required",
      });
    }
    const existUser =await User.findOne({email});
    if(!existUser){
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
    }
    const user =await User.findOneAndUpdate({email}, {cart_items}, {new: true});
    res.status(200).json({
      success: true,
      cart_items: user.cart_items
    });
  } catch (error) {
    console.log(err);
  }
  console.log(req.body);
};

module.exports = updateCart;
