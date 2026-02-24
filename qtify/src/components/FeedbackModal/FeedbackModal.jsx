import React from "react";
import styles from "./FeedbackModal.module.css";
import CloseIcon from "@mui/icons-material/Close";

export default function FeedbackModal({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Feedback</h2>
          <CloseIcon
            className={styles.close}
            onClick={onClose}
          />
        </div>

        <input placeholder="Full name" />
        <input placeholder="Email ID" />
        <input placeholder="Subject" />
        <textarea placeholder="Description" rows="4" />

        <button className={styles.submit}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
}