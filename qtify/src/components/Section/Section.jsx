import React, { useEffect, useState ,useRef } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section({ title, endpoint }){
  const [data, setData] = useState([]);
  const rowRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    axios.get(endpoint).then((res) => {
      setData(res.data);
    });
  }, [endpoint]);

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
        <button
          className={styles.toggle}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Collapse" : "Show all"}
        </button>
      </div>

      {isCollapsed ? (
        <div className={styles.grid}>
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={item.follows}
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
                follows={item.follows}
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