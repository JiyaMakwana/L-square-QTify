import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./TopAlbums.module.css";

const TopAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://qtify-backend.labs.crio.do/albums/top")
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      {albums.map((album) => (
        <Card
          key={album.id}
          image={album.image}
          title={album.title}
          follows={album.follows}
        />
      ))}
    </div>
  );
};

export default TopAlbums;