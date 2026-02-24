import React, { useRef, useState, useEffect } from "react";

export default function Player({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [song]);

  if (!song) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#000",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        zIndex: 999
      }}
    >
      <div>
        <strong>{song.title}</strong>
      </div>

      <button
        onClick={togglePlay}
        style={{
          background: "#34C94B",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <audio
        ref={audioRef}
        src={song.preview}
      />
    </div>
  );
}