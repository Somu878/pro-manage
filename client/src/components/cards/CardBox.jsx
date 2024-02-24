import React, { useState, useEffect } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import styles from "./cardbox.module.css";
import Card from "./Card";
function CardBox({ statusName }) {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardBoxGroup}>
        <div style={{ fontWeight: "600" }}>{statusName}</div>
        <div>
          {statusName === "To-do" ? <IoIosAdd size={"23px"} /> : <></>}
          <VscCollapseAll size={"20px"} color="#767575" onClick={() => {}} />
        </div>
      </div>
      <div className={styles.cardList}>
        {/* <Card
          id={"1"}
          priority="low"
          title="test title2"
          tasks={[
            { _id: 1, content: "njnssdcs", isDone: false },
            { _id: 2, content: "sdsad asada", isDone: false },
          ]}
          dueDate="29th Feb"
          status={statusName}
          collapse={collapse}
        /> */}
      </div>
    </div>
  );
}

export default CardBox;
