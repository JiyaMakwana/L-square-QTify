import React, { useEffect, useState ,useRef } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section({ title, endpoint ,data: externalData,
  type = "album",
  showToggle = true,
  children }){
  const [data, setData] = useState([]);
  const rowRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
  if (endpoint) {
    axios.get(endpoint).then((res) => {
      setData(res.data);
    });
    }
  }, [endpoint]);

  useEffect(() => {
    if (externalData) {
      setData(externalData);
    }
  }, [externalData]);

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className={styles.section}>
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
      {children}

      {isCollapsed ? (
        <div className={styles.grid}>
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={type === "song" ? item.likes : item.follows}
              type={type}
            />
          ))}
        </div>
      ) : (
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