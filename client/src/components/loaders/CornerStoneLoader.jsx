import React from "react";
import styles from "./cornerstone.module.css";
function CornerStoneLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default CornerStoneLoader;
