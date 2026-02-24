import React from "react";
import styles from "./Card.module.css";
import { Chip } from "@mui/material";

export default function Card({image, title, follows, type="album"}) {
    return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.bottomSection}>
        <Chip
          label={`${follows} Likes`}
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