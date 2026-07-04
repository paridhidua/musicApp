import { useEffect, useState } from "react";
import axios from "axios";

import { useMusic } from "../context/MusicContext";

function Favorites() {

const { setCurrentSong } = useMusic();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/favorites"
      );

      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async (songId) => {
    try {
      await axios.delete(
        `http://localhost:5000/favorites/${songId}`
      );

      fetchFavorites();
    } catch (err) {
      console.error(err);
      alert("Failed to remove favorite");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>❤️ Favorites</h1>

      {favorites.length === 0 ? (
        <h3>No favorite songs yet.</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          {favorites.map((song) => (
            <div
              key={song.id}
              className="song-card"
            >
              <img
                src={
                  song.cover_image
                    ? `http://localhost:5000/${song.cover_image.replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://placehold.co/300x300"
                }
                alt={song.title}
                style={{
                  width: "100%",
                  borderRadius: "15px",
                }}
              />

              <h3>{song.title}</h3>

              <p>{song.artist}</p>

              <button
                onClick={() =>
                  setCurrentSong(song)
                }
              >
                ▶ Play
              </button>

              <button
                onClick={() =>
                  removeFavorite(song.id)
                }
              >
                💔 Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;