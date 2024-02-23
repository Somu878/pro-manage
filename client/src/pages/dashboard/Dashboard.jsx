import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { format } from "date-fns";
import Arrow from "..//../assets/Vector 14.svg";
import toast, { Toaster } from "react-hot-toast";
function Dashboard() {
  const currentDate = format(new Date(), "do MMM, yyyy");
  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  return (
    <div className={styles.dashboardContainer}>
      <p style={{ fontSize: "18px", fontWeight: "500" }}>Welcome!{}</p>
      <p className={styles.date}>{currentDate}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "550" }}>Board</p>
        <div className={styles.dropDown} onClick={handleDropDown}>
          This Week
          <img src={Arrow} alt="dropdown" />
        </div>
        {dropDown ? (
          <div className={styles.dropDownList}>
            <div>Today</div>
            <div>This Week</div>
            <div>This Month</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
