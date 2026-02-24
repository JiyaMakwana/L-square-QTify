import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Section from "../Section/Section";

export default function Songs(){
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [value, setValue] = useState("all");

  useEffect(() => {
    fetch("https://qtify-backend.labs.crio.do/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  useEffect(() => {
    fetch("https://qtify-backend.labs.crio.do/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data.data));
  }, []);

  const filteredSongs =
    value === "all"
      ? songs
      : songs.filter((song) => song.genre.key === value);

  return (
    <div>
      <Section
        title="Songs"
        data={filteredSongs}
        type="song"
        showToggle={false}
      >
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: "#34C94B" },
          }}
        >
          <Tab label="All" value="all" />
          {genres.map((genre) => (
            <Tab
              key={genre.key}
              label={genre.label}
              value={genre.key}
            />
          ))}
        </Tabs>
      </Section>
    </div>
  );
};
