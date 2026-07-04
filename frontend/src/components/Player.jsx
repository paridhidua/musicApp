import { useRef, useState, useEffect } from "react";
import { useMusic } from "../context/MusicContext";

export default function Player() {
  const {
    songs,
    currentSong,
    setCurrentSong,
    currentIndex,
    setCurrentIndex,
  } = useMusic();

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  // Play whenever currentSong changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;

        case "ArrowRight":
          nextSong();
          break;

        case "ArrowLeft":
          previousSong();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [currentSong, currentIndex, songs]);

  if (!currentSong) return null;

  // -------------------------
  // NEXT SONG
  // -------------------------

  const nextSong = () => {
    if (songs.length === 0) return;

    const next =
      (currentIndex + 1) % songs.length;

    setCurrentIndex(next);
    setCurrentSong(songs[next]);
  };

  // -------------------------
  // PREVIOUS SONG
  // -------------------------

  const previousSong = () => {
    if (songs.length === 0) return;

    const prev =
      (currentIndex - 1 + songs.length) %
      songs.length;

    setCurrentIndex(prev);
    setCurrentSong(songs[prev]);
  };

  // -------------------------
  // PLAY / PAUSE
  // -------------------------

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // -------------------------
  // PROGRESS
  // -------------------------

  const updateProgress = () => {
    if (!audioRef.current) return;

    const current =
      audioRef.current.currentTime;

    const duration =
      audioRef.current.duration || 1;

    setProgress((current / duration) * 100);
  };

  const changeProgress = (e) => {
    if (!audioRef.current) return;

    const value = e.target.value;

    const duration =
      audioRef.current.duration || 1;

    audioRef.current.currentTime =
      (value / 100) * duration;

    setProgress(value);
  };

  // -------------------------
  // VOLUME
  // -------------------------

  const changeVolume = (e) => {
    const value = Number(e.target.value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }

    setVolume(value);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: "1200px",
        height: "100px",
        zIndex: 1000,

        background: "rgba(28,28,30,0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",

        padding: "15px",

        color: "white",

        display: "flex",
        alignItems: "center",
        gap: "20px",

        boxShadow:
          "0 8px 30px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={
          currentSong.cover_image
            ? `http://localhost:5000/${currentSong.cover_image.replace(
                /\\/g,
                "/"
              )}`
            : "https://placehold.co/80x80"
        }
        alt="cover"
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>
          {currentSong.title}
        </h3>

        <p
          style={{
            margin: "5px 0",
            opacity: 0.7,
          }}
        >
          {currentSong.artist}
        </p>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={changeProgress}
          style={{ width: "100%" }}
        />
      </div>

      <button onClick={previousSong}>
        ⏮
      </button>

      <button onClick={togglePlay}>
        {isPlaying ? "⏸" : "▶"}
      </button>

      <button onClick={nextSong}>
        ⏭
      </button>

      <div>
        🔊

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
        />
      </div>

      <audio
        ref={audioRef}
        autoPlay
        src={`http://localhost:5000/${currentSong.file_path.replace(
          /\\/g,
          "/"
        )}`}
        onTimeUpdate={updateProgress}
        onEnded={nextSong}
      />
    </div>
  );
}