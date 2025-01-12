const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoute");
const eventRoutes = require("./routes/eventRoute")

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8080;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/event", eventRoutes);

//def route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
