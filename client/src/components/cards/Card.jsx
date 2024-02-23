import React, { useState } from "react";
import styles from "./card.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
function Card({ id, priority, title, tasks, dueDate, status }) {
  const [showTasks, setShowTasks] = useState(false);
  const priorities = {
    high: {
      color: "red",
      name: "High Priority",
    },
    moderate: {
      color: "yellow",
      name: "Moderate Priority",
    },
    low: {
      color: "green",
      name: "Low Priority",
    },
  };

  const statusButtons = {
    Backlog: ["PROGRESS", "TO-DO", "DONE"],
    Progress: ["BACKLOG", "TO-DO", "DONE"],
    "To-do": ["BACKLOG", "PROGRESS", "DONE"],
    Done: ["BACKLOG", "PROGRESS", "TO-DO"],
  };
  const StatusButtons = () => {
    return (
      statusButtons[status] &&
      statusButtons[status].map((buttonLabel) => (
        <div key={buttonLabel}>{buttonLabel}</div>
      ))
    );
  };
  const CardPriority = priorities[priority.toLowerCase()];
  return (
    <div className={styles.card}>
      <div className={styles.cardGroup}>
        <div style={{ display: "flex", fontSize: "12.5px" }}>
          <div>
            <GoDotFill color={CardPriority.color} size={"18px"} />
          </div>

          {CardPriority.name}
        </div>
        <div>
          <TbDots size={"23px"} />
        </div>
      </div>
      <div
        style={{ fontWeight: "500", fontSize: "20px", marginBottom: "15px" }}
      >
        {title}
      </div>
      <div className={styles.cardGroup}>
        <div style={{ fontSize: "14px", fontWeight: "500" }}>
          Checklist({tasks.filter((task) => task.isDone).length}/{tasks.length})
        </div>
        <div className={styles.icon}>
          <RiArrowDropDownLine //TODO
            size={"25px"}
            onClick={() => setShowTasks(!showTasks)}
          />
        </div>
      </div>
      {showTasks ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          {tasks.map((task) => (
            <div key={task._id} className={styles.taskItem}>
              <input
                type="checkbox"
                id={`task-${task._id}`}
                checked={task.isDone}
                onChange={() => {}}
              />
              <label htmlFor={`task-${task._id}`}>{task?.content}</label>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      <div className={styles.cardGroup} style={{ marginTop: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: "600" }}>{dueDate}</div>
        <div className={styles.btnGroup}>{StatusButtons()}</div>
      </div>
    </div>
  );
}

export default Card;
