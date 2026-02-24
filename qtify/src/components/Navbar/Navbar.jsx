import React, { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";
import FeedbackModal from "../FeedbackModal/FeedbackModal";

function Navbar({ searchData }) {
  const [open, setOpen] = useState(false);

  // 🔥 Prevent background scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <Logo />
        </div>

        <div className={styles.center}>
          <Search
            placeholder="Search a song of your choice"
            searchData={searchData}
          />
        </div>

        <div className={styles.right}>
          <button
            className={styles.feedbackBtn}
            onClick={() => setOpen(true)}
          >
            Give Feedback
          </button>
        </div>
      </nav>

      {open && <FeedbackModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default Navbar;