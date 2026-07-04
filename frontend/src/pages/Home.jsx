import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";
import UploadSong from "../components/UploadSong";
import PlaylistSection from "../components/PlaylistSection";

import { useMusic } from "../context/MusicContext";

function Home() {
  const [songs, setLocalSongs] = useState([]);
  const [search, setSearch] = useState("");

  const { setSongs } = useMusic();

  useEffect(() => {
    axios
      .get("http://localhost:5000/songs")
      .then((res) => {
        setLocalSongs(res.data);

        // Store songs globally for the Player queue
        setSongs(res.data);
      })
      .catch(console.error);
  }, []);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1>🎵 Listen Now</h1>

      <UploadSong />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <PlaylistSection />

      <div className="songs-grid">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            songs={filteredSongs}
          />
        ))}
      </div>
    </>
  );
}

export default Home;