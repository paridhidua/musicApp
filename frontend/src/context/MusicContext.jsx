import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,

        currentSong,
        setCurrentSong,

        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}