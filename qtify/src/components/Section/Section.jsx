import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section({
  title,
  endpoint,
  data: externalData,
  type = "album",
  showToggle = true,
  children,
  setCurrentSong
}) {
  const [data, setData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const rowRef = useRef(null);

  // 🔹 Fetch from endpoint (Albums mode)
  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(endpoint);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching section data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  // 🔹 Use external data (Songs mode)
  useEffect(() => {
    if (externalData) {
      setData(externalData);
    }
  }, [externalData]);

  // 🔹 Safe scroll functions
  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{title}</h2>

        {showToggle && (
          <button
            className={styles.toggle}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "Collapse" : "Show all"}
          </button>
        )}
      </div>

      {/* Tabs if any (Songs) */}
      {children}

      {/* Loading */}
      {loading ? (
        <p style={{ color: "white" }}>Loading...</p>
      ) : isCollapsed ? (
        // Grid View
        <div className={styles.grid}>
          {data.map((item) => (
            <Card
                key={item.id}
                image={item.image}
                title={item.title}
                follows={type === "song" ? item.likes : item.follows}
                type={type}
                album={item}
                id={item.id}
                song={item}
                onClick={() => {
                  if (type === "song" && setCurrentSong) {
                    setCurrentSong(item);
                  }
                }}
              />
          ))}
        </div>
      ) : (
        // Carousel View
        <div className={styles.sliderWrapper}>
          <button className={styles.arrowLeft} onClick={scrollLeft}>
            ❮
          </button>

          <div className={styles.row} ref={rowRef}>
            {data.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.title}
                follows={type === "song" ? item.likes : item.follows}
                type={type}
                album={item}
                id={item.id}
                song={item}
                onClick={() => {
                  if (type === "song" && setCurrentSong) {
                    setCurrentSong(item);
                  }
                }}
              />
            ))}
          </div>

          <button className={styles.arrowRight} onClick={scrollRight}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
}