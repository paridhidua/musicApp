const pool = require("../db");

const uploadSong = async (req, res) => {
  try {
    const { title, artist, album } = req.body;

    const songFile = req.files["song"]
      ? req.files["song"][0].path
      : null;

    const coverImage = req.files["cover"]
      ? req.files["cover"][0].path
      : null;

    const result = await pool.query(
      `INSERT INTO songs
      (title, artist, album, file_path, cover_image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        title,
        artist,
        album,
        songFile,
        coverImage,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

const getSongs = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM songs ORDER BY uploaded_at DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  uploadSong,
  getSongs,
};