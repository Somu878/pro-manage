import React, { useState } from "react";
import styles from "./card.module.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
function Card({
  id,
  priority,
  title,
  tasks,
  dueDate,
  status,
  collapse,
  handleCollapse,
}) {
  const [showTasks, setShowTasks] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
          <div style={{}}>
            <GoDotFill color={CardPriority.color} size={"18px"} />
          </div>
          {CardPriority.name}
        </div>
        <div>
          <TbDots size={"23px"} onClick={() => setShowMenu(!showMenu)} />
          {showMenu ? (
            <div className={styles.menu}>
              <div>Edit</div>
              <div>Share</div>
              <div style={{ color: "red" }}>Delete</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        style={{ fontWeight: "500", fontSize: "20px", marginBottom: "15px" }}
      >
        {title}
      </div>
      <div className={styles.cardGroup}>
        <div className={styles.checklist}>
          Checklist({tasks.filter((task) => task.isDone).length}/{tasks.length})
        </div>
        <div
          className={styles.icon}
          onClick={() => {
            setShowTasks(!showTasks);
            handleCollapse();
          }}
        >
          {showTasks && collapse ? (
            <RiArrowDropUpLine size={"23px"} />
          ) : (
            <RiArrowDropDownLine size={"23px"} />
          )}
        </div>
      </div>
      {showTasks && collapse ? (
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
