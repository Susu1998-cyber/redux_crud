const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./route/userRoutes");
const employeeRoutes = require("./route/employeeRoutes");
const cartRoutes = require('./route/cartRoutes')
const paymentRoutes = require('./route/paymentRoutes');


// const productRoutes = require('./route/productRoutes')

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employe", employeeRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/payment',paymentRoutes)
// app.use("/api/products",productRoutes)

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Database"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

  app.get("/", (req, res) => {
  res.send("Backend is running successfully ");
});


app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
