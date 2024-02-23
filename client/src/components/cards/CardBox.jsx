import React, { useState, useEffect } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import styles from "./cardbox.module.css";
import Card from "./Card";
function CardBox({ statusName }) {
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardBoxGroup}>
        <div style={{ fontWeight: "600" }}>{statusName}</div>
        <div>
          {statusName === "To-do" ? <IoIosAdd size={"23px"} /> : <></>}
          <VscCollapseAll size={"20px"} color="#767575" />
        </div>
      </div>
      <div>
        <Card
          id={"1"}
          priority="moderate"
          title="test title"
          tasks={[
            { _id: 1, content: "njnss", isDone: true },
            { _id: 2, content: "sdsad", isDone: false },
          ]}
          dueDate="29th Feb"
          status={statusName}
        />
      </div>
    </div>
  );
}

export default CardBox;
