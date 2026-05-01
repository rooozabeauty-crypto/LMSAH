const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// ======================
// Middleware
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Import DB
// ======================
const { users, orders } = require("./db");

// ======================
// Routes
// ======================
const callbackRoutes = require("./routes/callback");
app.use("/webhook", callbackRoutes);

// ======================
// Test API
// ======================
app.get("/", (req, res) => {
  res.send("🚀 LMSAH System Running");
});

app.get("/status", (req, res) => {
  res.json({ status: "running ✅" });
});

// ======================
// Users
// ======================
app.get("/users", (req, res) => {
  res.json(users);
});

// ======================
// Orders by user
// ======================
app.get("/orders/:userId", (req, res) => {
  const userOrders = orders.filter(
    o => o.userId === req.params.userId
  );

  res.json(userOrders);
});

// ======================
// Create user (اختياري)
// ======================
app.post("/create-user", (req, res) => {
  const { name } = req.body;

  const newUser = {
    id: "user_" + (users.length + 1),
    name,
    apiKey: Math.random().toString(36).substring(7)
  };

  users.push(newUser);

  res.json(newUser);
});

// ======================
// Export
// ======================
module.exports = app;
