import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { format } from "date-fns";
import Arrow from "..//../assets/Vector 14.svg";
import toast, { Toaster } from "react-hot-toast";
import CardBox from "../../components/cards/CardBox";
function Dashboard() {
  const currentDate = format(new Date(), "do MMM, yyyy");
  const [dropDown, setDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Today");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setDropDown(false); // Close the dropdown after selecting an option
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
        <p style={{ fontSize: "20px", fontWeight: "550", marginTop: "-3px" }}>
          Board
        </p>
        <div className={styles.dropDown} onClick={handleDropDown}>
          {selectedOption}
          <img src={Arrow} alt="dropdown" />
          {/* <select>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
        </select>*/}
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
      <div className={styles.cardsContainer}>
        <CardBox statusName={"Backlog"} />
        <CardBox statusName={"Progress"} />
        <CardBox statusName={"To-do"} />
        <CardBox statusName={"Done"} />
      </div>
    </div>
  );
}

export default Dashboard;
