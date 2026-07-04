const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../db");

const { uploadSong, getSongs } =
  require("../controllers/songController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  uploadSong
);
router.get("/", getSongs);

module.exports = router;

router.put("/:id", async (req, res) => {
  try {
    const { title, artist } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE songs
       SET title = $1,
           artist = $2
       WHERE id = $3
       RETURNING *`,
      [title, artist, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM songs WHERE id = $1",
      [id]
    );

    res.json({
      message: "Song deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});