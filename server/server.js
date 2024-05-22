const express = require("express");
const app = express();
const userRouter = require("./routes/useRoute");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({
    message: "This is an example",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
// middlewares
app.use(express.json());
app.use(cookieParser());

// router
app.use("/user", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
// db connect
const db = require("./config/database");

db.connect();
