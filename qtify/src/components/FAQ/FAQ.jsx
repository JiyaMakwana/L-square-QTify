import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import styles from "./FAQ.module.css";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("https://qtify-backend.labs.crio.do/faq")
      .then((res) => res.json())
      .then((data) => setFaqs(data.data));
  }, []);

  return (
    <div
      style={{
        padding: "60px 100px",
        background: "#121212",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 600,
          marginBottom: "40px",
        }}
      >
        FAQs
      </h2>

      {faqs.map((faq) => (
        <Accordion
          key={faq.question}
          sx={{
            backgroundColor: "#121212",
            color: "white",
            border: "1px solid #444",
            borderRadius: "10px",
            marginBottom: "16px",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#34C94B" }} />
            }
            sx={{
              fontWeight: 500,
            }}
          >
            {faq.question}
          </AccordionSummary>

          <AccordionDetails
            sx={{
              backgroundColor: "#EDEDED",
              color: "#121212",
              borderRadius: "0 0 10px 10px",
              padding: "16px",
            }}
          >
            {faq.answer}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}