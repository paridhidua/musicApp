import { useEffect, useState } from "react";
import axios from "axios";

function Albums({ setCurrentSong }) {
  const [albums, setAlbums] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/songs")
      .then((res) => {
        const grouped = {};

        res.data.forEach((song) => {
          const albumName = song.album || "Unknown Album";

          if (!grouped[albumName]) {
            grouped[albumName] = [];
          }

          grouped[albumName].push(song);
        });

        setAlbums(grouped);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>💿 Albums</h1>

      {Object.keys(albums).map((album) => (
        <div
          key={album}
          style={{
            marginBottom: "50px",
          }}
        >
          <h2>{album}</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {albums[album].map((song) => (
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
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  ▶ Play
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Albums;