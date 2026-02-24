import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "./AlbumPage.module.css";

export default function AlbumPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const album = location.state?.album;

  const [page, setPage] = useState(1);
  const songsPerPage = 13;

  if (!album) {
    return <p style={{ color: "white" }}>Album not found</p>;
  }

  const totalPages = Math.ceil(album.songs.length / songsPerPage);

  const currentSongs = album.songs.slice(
    (page - 1) * songsPerPage,
    page * songsPerPage
  );

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {/* Back Button */}
        <button
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        {/* Album Header */}
        <div className={styles.header}>
          <img src={album.image} alt={album.title} />

          <div className={styles.details}>
            <h1>{album.title}</h1>
            <p>{album.description}</p>

            <p className={styles.meta}>
              {album.songs.length} songs • {album.follows} Follows
            </p>

            <div className={styles.buttons}>
              <button className={styles.shuffle}>
                Shuffle
              </button>
              <button className={styles.library}>
                Add to library
              </button>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className={styles.tableHeader}>
          <span>Title</span>
          <span>Artist</span>
          <span>Duration</span>
        </div>

        {/* Songs */}
        {currentSongs.map((song) => (
          <div key={song.id} className={styles.row}>
            <div className={styles.songInfo}>
              <img src={song.image} alt={song.title} />
              <span>{song.title}</span>
            </div>

            <span>{song.artists.join(", ")}</span>

            <span>
              {Math.floor(song.durationInMs / 60000)}:
              {String(
                Math.floor((song.durationInMs % 60000) / 1000)
              ).padStart(2, "0")}
            </span>
          </div>
        ))}

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? styles.active : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}