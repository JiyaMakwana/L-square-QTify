import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ placeholder, searchData = [] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query, searchData]);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className={styles.icon} />
      </div>

      {results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((item) => (
            <div key={item.id} className={styles.resultItem}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.artists?.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}