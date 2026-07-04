const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create playlist
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      "INSERT INTO playlists (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all playlists
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM playlists ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add song to playlist
router.post("/:playlistId/songs/:songId", async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    await pool.query(
      "INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2)",
      [playlistId, songId]
    );

    res.json({ message: "Song added to playlist 🎵" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get songs in a playlist
router.get("/:playlistId", async (req, res) => {
  try {
    const { playlistId } = req.params;

    const result = await pool.query(
      `SELECT songs.*
       FROM playlist_songs
       JOIN songs ON playlist_songs.song_id = songs.id
       WHERE playlist_songs.playlist_id = $1`,
      [playlistId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;

    await pool.query(
      "UPDATE playlists SET name=$1 WHERE id=$2",
      [name, req.params.id]
    );

    res.json({
      message: "Playlist renamed successfully"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM playlist_songs WHERE playlist_id=$1",
      [req.params.id]
    );

    await pool.query(
      "DELETE FROM playlists WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Playlist deleted"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


module.exports = router;
router.post("/:playlistId/songs", async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;

    const result = await pool.query(
      `INSERT INTO playlist_songs
      (playlist_id, song_id)
      VALUES ($1, $2)
      RETURNING *`,
      [playlistId, songId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});
router.get("/:id/songs", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT songs.*
       FROM playlist_songs
       JOIN songs
       ON playlist_songs.song_id = songs.id
       WHERE playlist_songs.playlist_id = $1`,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});