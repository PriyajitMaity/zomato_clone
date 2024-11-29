const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors");
const authRoutes =require("./routes/authRouter");
const cartRoutes =require("./routes/cartRouter");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api', authRoutes);
app.use('/api/product', cartRoutes);


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

