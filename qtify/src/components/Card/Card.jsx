import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { Chip } from "@mui/material";

export default function Card({
  id,
  image,
  title,
  follows,
  type = "album",
  album,
  onClick
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "album") {
      navigate(`/album/${id}`, { state: { album } });
    } else if (type === "song" && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.bottomSection}>
        <Chip
          label={`${follows} ${type === "song" ? "Likes" : "Follows"}`}
          size="small"
          sx={{
            backgroundColor: "black",
            color: "white",
            fontWeight: 600,
            borderRadius: "16px",
            padding: "4px 8px"
          }}
        />
      </div>

      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  );
}