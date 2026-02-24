import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import Songs from "../components/Songs/Songs";
import FAQ from "../components/FAQ/FAQ";

export default function Home() {
  const [songsData, setSongsData] = useState([]);

  // 🔥 Fetch songs once for search
  useEffect(() => {
    fetch("https://qtify-backend.labs.crio.do/songs")
      .then((res) => res.json())
      .then((data) => setSongsData(data));
  }, []);

  return (
    <>
      <Navbar searchData={songsData} />

      <Hero />

      <Section
        title="Top Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/top"
      />

      <Songs />

      <Section
        title="New Albums"
        endpoint="https://qtify-backend.labs.crio.do/albums/new"
      />

      <FAQ />
    </>
  );
}