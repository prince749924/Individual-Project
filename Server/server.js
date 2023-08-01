const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
app.use(express.json());
// Database Connection Function
connectDB();

const usersRoute = require("./routes/usersRoute");
const productsRoutes = require("./routes/productsRoute");
const bidsRoutes = require("./routes/bidsRoute");
const adsRoutes = require("./routes/advertisementRoute");

const notificationsRoutes = require("./routes/notificationsRoute");
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoutes);
app.use("/api/bids", bidsRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/notifications", notificationsRoutes);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on PORT ${port}`));
