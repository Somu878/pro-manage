import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { format } from "date-fns";
import Arrow from "..//../assets/Vector 14.svg";
import toast, { Toaster } from "react-hot-toast";
import CardBox from "../../components/cards/CardBox";
import userApi from "../../apis/UserApi";
function Dashboard() {
  const currentDate = format(new Date(), "do MMM, yyyy");
  const [dropDown, setDropDown] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedFilter, setSelectedOption] = useState("today");
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  const renderCardBoxes = () => {
    return ["Backlog", "To do", "Progress", "Done"].map((statusName) => (
      <CardBox key={statusName} status={statusName} filter={"month"} />
    ));
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setDropDown(false);
  };
  const getUserData = async () => {
    try {
      const response = await userApi.getUserData();
      setUserName(response);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <p style={{ fontSize: "18px", fontWeight: "500" }}>
        Welcome {userName}!{}
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
            <div onClick={() => handleOptionChange("today")}>today</div>
            <div onClick={() => handleOptionChange("week")}>This Week</div>
            <div onClick={() => handleOptionChange("month")}>This Month</div>
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
