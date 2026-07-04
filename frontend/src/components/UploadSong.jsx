import { useState } from "react";
import axios from "axios";

function UploadSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !artist || !audioFile) {
      alert("Please fill all fields and choose an MP3 file.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);

    // Backend expects "song"
    formData.append("song", audioFile);

    if (coverImage) {
      formData.append("cover", coverImage);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/songs/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      alert("Song uploaded successfully!");

      // Reset form
      setTitle("");
      setArtist("");
      setAlbum("");
      setAudioFile(null);
      setCoverImage(null);

      // Refresh page
      window.location.reload();

    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(
          "Backend Error:",
          err.response.data
        );
      }

      alert("Upload failed");
    }
  };

  return (
    <div
      style={{
        background: "#1c1c1e",
        padding: "20px",
        borderRadius: "20px",
        marginBottom: "30px",
        color: "white",
      }}
    >
      <h2>Upload Song</h2>

      <form onSubmit={handleUpload}>

        {/* Song Title */}
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />

        {/* Artist */}
        <input
          type="text"
          placeholder="Artists (comma separated)"
          value={artist}
          onChange={(e) =>
            setArtist(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />

        {/* Album */}
        <input
          type="text"
          placeholder="Album Name"
          value={album}
          onChange={(e) =>
            setAlbum(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />

        {/* Audio Upload */}
        <label>Choose MP3:</label>
        <br />
        <br />

        <input
          type="file"
          accept="audio/*"
          onChange={(e) =>
            setAudioFile(e.target.files[0])
          }
        />

        <br />
        <br />

        {/* Cover Upload */}
        <label>Choose Cover Image:</label>
        <br />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setCoverImage(e.target.files[0])
          }
        />

        <br />
        <br />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Upload Song
        </button>

      </form>
    </div>
  );
}

export default UploadSong;