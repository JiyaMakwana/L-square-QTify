import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Section from "../Section/Section";

export default function Songs({ setCurrentSong }) {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [value, setValue] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch Songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://qtify-backend.labs.crio.do/songs"
        );
        const data = await res.json();
        setSongs(data);
      } catch (err) {
        setError("Failed to load songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // 🔹 Fetch Genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://qtify-backend.labs.crio.do/genres"
        );
        const data = await res.json();
        setGenres(data.data);
      } catch (err) {
        console.error("Failed to load genres");
      }
    };

    fetchGenres();
  }, []);

  // 🔹 Filter Logic
  const filteredSongs =
    value === "all"
      ? songs
      : songs.filter((song) => song.genre.key === value);

  return (
   <Section
  title="Songs"
  data={filteredSongs}
  type="song"
  showToggle={false}
  setCurrentSong={setCurrentSong}
>
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        textColor="inherit"
        TabIndicatorProps={{
          style: { backgroundColor: "#34C94B" }
        }}
        sx={{
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        <Tab
          label="All"
          value="all"
          sx={{
            color: "white",
            textTransform: "none",
            fontWeight: 500,
            "&.Mui-selected": { color: "#34C94B" }
          }}
        />

        {genres.map((genre) => (
          <Tab
            key={genre.key}
            label={genre.label}
            value={genre.key}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": { color: "#34C94B" }
            }}
          />
        ))}
      </Tabs>

      {/* Loading / Error */}
      {loading && <p style={{ color: "white" }}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Section>
  );
}