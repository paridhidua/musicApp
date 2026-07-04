import { useEffect, useState } from "react";
import axios from "axios";

function Playlists({ setCurrentSong }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/playlists")
      .then((res) => setPlaylists(res.data))
      .catch(console.error);
  }, []);

  const loadSongs = async (playlistId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/playlists/${playlistId}/songs`
      );

      setPlaylistSongs(res.data);
      setSelectedPlaylist(playlistId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ paddingBottom: "170px" }}>
      <h1>📂 Your Playlists</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => loadSongs(playlist.id)}
            style={{
              width: "220px",
              background: "#1c1c1e",
              padding: "20px",
              borderRadius: "20px",
              cursor: "pointer",
              color: "white",
              transition: "0.3s",
            }}
          >
            <h3>{playlist.name}</h3>

            <p>
              {new Date(
                playlist.created_at
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {selectedPlaylist && (
        <>
          <h2>🎵 Playlist Songs</h2>

          {playlistSongs.length === 0 ? (
            <p>No songs in this playlist.</p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {playlistSongs.map((song) => (
                <div
                  key={song.id}
                  style={{
                    width: "220px",
                    background: "#1c1c1e",
                    padding: "15px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                >
                  <img
                    src={
                      song.cover_image
                        ? `http://localhost:5000/${song.cover_image.replace(
                            /\\/g,
                            "/"
                          )}`
                        : "https://placehold.co/220x220"
                    }
                    alt={song.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />

                  <h3>{song.title}</h3>

                  <p>{song.artist}</p>

                  <button
                    onClick={() => setCurrentSong(song)}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    ▶ Play
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Playlists;