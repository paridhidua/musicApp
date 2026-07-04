import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Player from "./components/Player";

import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";

import { useMusic } from "./context/MusicContext";

function App() {
  const {
  songs,
  currentSong,
  setCurrentSong,
} = useMusic();

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main
          className="content"
          style={{
            paddingBottom: "220px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/playlists" element={<Playlists />} />
          </Routes>
        </main>

        <Player />
      </div>
    </BrowserRouter>
  );
}

export default App;