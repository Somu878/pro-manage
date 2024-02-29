import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { format } from "date-fns";
import Arrow from "..//../assets/Vector 14.svg";
import CardBox from "../../components/cards/CardBox";
import { useAppContext } from "../../components/layouts/AppLayout";
function Dashboard() {
  const currentDate = format(new Date(), "do MMM, yyyy");
  const [dropDown, setDropDown] = useState(false);
  const [selectedFilter, setSelectedOption] = useState("Today");
  const { username } = useAppContext();
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  const renderCardBoxes = () => {
    return ["Backlog", "To do", "Progress", "Done"].map((statusName) => (
      <CardBox key={statusName} status={statusName} filter={selectedFilter} />
    ));
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setDropDown(false);
    return option;
  };

  return (
    <div className={styles.dashboardContainer}>
      <p style={{ fontSize: "18px", fontWeight: "500" }}>
        Welcome {username}!{}
      </p>
      <p className={styles.date}>{currentDate}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "550", marginTop: "-3px" }}>
          Board
        </p>
        <div className={styles.dropDown} onClick={handleDropDown}>
          {selectedFilter}
          <img src={Arrow} alt="dropdown" />
        </div>
        {dropDown ? (
          <div className={styles.dropDownList}>
            <div onClick={() => handleOptionChange("Today")}>Today</div>
            <div onClick={() => handleOptionChange("This Week")}>This Week</div>
            <div onClick={() => handleOptionChange("This Month")}>
              This Month
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.cardsContainer}>{renderCardBoxes()}</div>
    </div>
  );
}

export default Dashboard;
