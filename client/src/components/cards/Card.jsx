import React, { useState } from "react";
import styles from "./card.module.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";

import { GoDotFill } from "react-icons/go";
import Modal from "react-modal";
import CardModal from "../modals/CardModal";
import cardApi from "../../apis/CardApi";
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
  const BaseURL = import.meta.env.VITE_APP_URL;
  const [showTasks, setShowTasks] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "550px",
      height: "450px",
      padding: "30px",
      borderRadius: "20px",
      transform: "translate(-50%, -50%)",
    },
  };

  const priorities = {
    high: {
      color: "#FF2473",
      name: "High Priority",
    },
    moderate: {
      color: "#18B0FF",
      name: "Moderate Priority",
    },
    low: {
      color: "#63C05B",
      name: "Low Priority",
    },
  };

  const statusButtons = {
    Backlog: ["PROGRESS", "TO-DO", "DONE"],
    Progress: ["BACKLOG", "TO-DO", "DONE"],
    "To do": ["BACKLOG", "PROGRESS", "DONE"],
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
  const handleDeleteCard = async (cardId) => {
    const response = await cardApi.deletecard(cardId);
    if (response.status === 200) {
      alert("Deleted Successfully");
    }
  };
  const handleCopyToClipboard = () => {
    const textToCopy = `${BaseURL}viewCard/${id}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
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
              <div onClick={() => setShowEditModal(true)}>Edit</div>
              <Modal
                isOpen={showEditModal}
                style={customStyles}
                onRequestClose={() => setShowEditModal(false)}
                ariaHideApp={false}
              >
                <CardModal
                  mode={"edit"}
                  cardId={id}
                  handleModelClose={() => setShowEditModal(false)}
                />
              </Modal>
              <div onClick={handleCopyToClipboard}>Share</div>
              <div
                style={{ color: "red" }}
                onClick={() => handleDeleteCard(id)}
              >
                Delete
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        style={{ fontWeight: "450", fontSize: "18px", marginBottom: "15px" }}
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
