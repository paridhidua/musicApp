import { useEffect, useState } from "react";
import axios from "axios";

function PlaylistSection() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState("");

  const loadPlaylists = () => {
    axios
      .get("http://localhost:5000/playlists")
      .then((res) => setPlaylists(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const createPlaylist = async () => {
    if (!newPlaylist.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/playlists",
        {
          name: newPlaylist,
        }
      );

      setNewPlaylist("");
      loadPlaylists();

    } catch (err) {
      console.error(err);
    }
  };

  const renamePlaylist = async (playlist) => {
    const name = prompt(
      "Rename Playlist",
      playlist.name
    );

    if (!name) return;

    try {
      await axios.put(
        `http://localhost:5000/playlists/${playlist.id}`,
        {
          name,
        }
      );

      loadPlaylists();

    } catch (err) {
      console.error(err);
    }
  };

  const deletePlaylist = async (playlist) => {
    const ok = window.confirm(
      `Delete "${playlist.name}" ?`
    );

    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/playlists/${playlist.id}`
      );

      loadPlaylists();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: 40 }}>

      <h2>Your Playlists</h2>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <input
          placeholder="New Playlist"
          value={newPlaylist}
          onChange={(e) =>
            setNewPlaylist(e.target.value)
          }
        />

        <button onClick={createPlaylist}>
          ➕ Create
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            style={{
              background: "#1c1c1e",
              padding: 20,
              width: 220,
              borderRadius: 18,
              color: "white",
            }}
          >
            <h3>{playlist.name}</h3>

            <p>
              {new Date(
                playlist.created_at
              ).toLocaleDateString()}
            </p>

            <button
              onClick={() =>
                renamePlaylist(playlist)
              }
            >
              ✏ Rename
            </button>

            <button
              onClick={() =>
                deletePlaylist(playlist)
              }
              style={{
                marginLeft: 10,
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistSection;