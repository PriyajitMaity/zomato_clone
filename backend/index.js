const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors");
const routes =require("./routes/authRouter")
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api', routes);


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

