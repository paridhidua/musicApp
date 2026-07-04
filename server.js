const express = require("express");
const cors = require("cors");
const songRoutes = require("./routes/songs");
const favoriteRoutes = require("./routes/favorites");
const playlistRoutes = require("./routes/playlists");
require("dotenv").config();

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/songs", songRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/playlists", playlistRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Music App Backend Running 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});