const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT songs.*
      FROM favorites
      JOIN songs ON favorites.song_id = songs.id
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:songId", async (req, res) => {
  try {
    const { songId } = req.params;

    await pool.query(
      "INSERT INTO favorites (song_id) VALUES ($1)",
      [songId]
    );

    res.json({ message: "Song added to favorites ❤️" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

router.delete("/:songId", async (req, res) => {
  try {
    const { songId } = req.params;

    await pool.query(
      "DELETE FROM favorites WHERE song_id=$1",
      [songId]
    );

    res.json({
      message: "Removed from favorites",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});