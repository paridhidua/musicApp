import { useState, useEffect } from "react";
import axios from "axios";

import { useMusic } from "../context/MusicContext";

function SongCard({ song, songs }) {
  const {
    setCurrentSong,
    setSongs,
    setCurrentIndex,
  } = useMusic();

  const [editing, setEditing] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] =
    useState("");

  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);

  useEffect(() => {
    axios
      .get("http://localhost:5000/playlists")
      .then((res) => setPlaylists(res.data))
      .catch(console.error);
  }, []);

  // ---------------- PLAY SONG ----------------

  const playSong = () => {
    setSongs(songs);

    const index = songs.findIndex(
      (s) => s.id === song.id
    );

    setCurrentIndex(index);

    setCurrentSong(song);
  };

  // ---------------- UPDATE SONG ----------------

  const saveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/songs/${song.id}`,
        {
          title,
          artist,
        }
      );

      alert("Song updated!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ---------------- DELETE SONG ----------------

  const deleteSong = async () => {
    if (
      !window.confirm(`Delete "${song.title}"?`)
    )
      return;

    try {
      await axios.delete(
        `http://localhost:5000/songs/${song.id}`
      );

      alert("Song deleted!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ---------------- FAVORITES ----------------

  const addToFavorites = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/favorites/${song.id}`
      );

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to add favorite");
    }
  };

  // ---------------- PLAYLIST ----------------

  const addToPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("Please select a playlist");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/playlists/${selectedPlaylist}/songs`,
        {
          songId: song.id,
        }
      );

      alert("Song added to playlist!");
    } catch (err) {
      console.error(err);
      alert("Failed to add song");
    }
  };

  return (
    <div className="song-card">
      <img
        src={
          song.cover_image
            ? `http://localhost:5000/${song.cover_image.replace(
                /\\/g,
                "/"
              )}`
            : "https://placehold.co/300x300"
        }
        alt="cover"
      />

      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            value={artist}
            onChange={(e) =>
              setArtist(e.target.value)
            }
          />

          <button onClick={saveChanges}>
            💾 Save
          </button>

          <button
            onClick={() => setEditing(false)}
          >
            ❌ Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{song.title}</h3>

          <p>{song.artist}</p>

          <button onClick={playSong}>
            ▶ Play
          </button>

          <button onClick={addToFavorites}>
            ❤️ Favorite
          </button>

          <button
            onClick={() => setEditing(true)}
          >
            ✏ Edit
          </button>

          <button onClick={deleteSong}>
            🗑 Delete
          </button>

          <div style={{ marginTop: "15px" }}>
            <select
              value={selectedPlaylist}
              onChange={(e) =>
                setSelectedPlaylist(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Playlist
              </option>

              {playlists.map((playlist) => (
                <option
                  key={playlist.id}
                  value={playlist.id}
                >
                  {playlist.name}
                </option>
              ))}
            </select>

            <button
              onClick={addToPlaylist}
              style={{
                marginLeft: "10px",
              }}
            >
              ➕ Add
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SongCard;