import React from "react";
import styles from "./analytics.module.css";

function Analytics() {
  return (
    <div className={styles.analyticsContainer}>
      <p>Analytics</p>
      <div className={styles.boxContainer}>
        <div className={styles.box1}>
          <ul>
            <li>Backlog Tasks</li>
            <li>To-Do Tasks</li>
            <li>In-Progress Tasks</li>
            <li>Completed Tasks</li>
          </ul>
          <ul style={{ listStyle: "none" }}>
            <li>2</li>
            <li>4</li>
            <li>5</li>
            <li>8</li>
          </ul>
        </div>
        <div className={styles.box2}>
          <ul>
            <li>Low Priority</li>
            <li>Moderate Priority</li>
            <li>High Priority</li>
            <li>Due Date Tasks</li>
          </ul>
          <ul style={{ listStyle: "none" }}>
            <li>2</li>
            <li>4</li>
            <li>5</li>
            <li>8</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
