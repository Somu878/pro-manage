import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";
import toast from "react-hot-toast";
import { GoDotFill } from "react-icons/go";
import Modal from "react-modal";
import { format } from "date-fns";
import CardModal from "../modals/CardModal";
import cardApi from "../../apis/CardApi";

function Card({
  id,
  priority,
  title,
  tasks: initialTasks,
  dueDate,
  status,
  collapse,
  handleCollapse,
  triggerReFetch,
}) {
  const BaseURL = import.meta.env.VITE_APP_URL;
  const [showTasks, setShowTasks] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
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
  const customStyles2 = {
    content: {
      width: "330px",
      height: "180px",
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "7px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
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
    backlog: ["PROGRESS", "TO DO", "DONE"],
    progress: ["BACKLOG", "TO DO", "DONE"],
    todo: ["BACKLOG", "PROGRESS", "DONE"],
    done: ["BACKLOG", "PROGRESS", "TO DO"],
  };
  const updateStatus = async (status) => {
    try {
      let updatedTasks = tasks;
      if (status === "done") {
        updatedTasks = tasks.map((task) => ({ ...task, isDone: true }));
      }
      await cardApi.updateStatus(id, { status, tasks: updatedTasks });
      triggerReFetch();
    } catch (error) {
      console.log(error);
    }
  };
  const StatusButtons = () => {
    return (
      statusButtons[status] &&
      statusButtons[status].map((label) => (
        <div
          key={label}
          onClick={() => updateStatus(label.toLowerCase().replace(/\s/g, ""))}
        >
          {label}
        </div>
      ))
    );
  };
  const isDueDatePassed = (dueDate) => {
    const currentDate = new Date();
    const dueDateObject = new Date(dueDate);
    return currentDate > dueDateObject;
  };
  const dueDateStyle = {
    fontSize: "10px",
    fontWeight: "600",
    color:
      status === "done"
        ? "white"
        : isDueDatePassed(dueDate)
        ? "white"
        : "#5a5a5a",
    border: "none",
    borderRadius: "7px",
    background:
      status === "done"
        ? "#63C05B"
        : isDueDatePassed(dueDate)
        ? "#CF3636"
        : "#DBDBDB",
  };

  const CardPriority = priorities[priority];
  const handleDeleteCard = async (cardId) => {
    const response = await cardApi.deletecard(cardId);
    if (response.status === "success") {
      toast.success("Card deleted Successfully");
      triggerReFetch();
    }
  };
  const handleCopyToClipboard = () => {
    const textToCopy = `${BaseURL}/view/${id}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowMenu(false);
      toast.success("Link copied to Clipboard");
    });
  };
  const updateTaskStatus = async (taskId, isDone) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, isDone } : task
      );
      setTasks(updatedTasks);
      await cardApi.updateStatus(id, { tasks: updatedTasks });
      // triggerReFetch();
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardGroup}>
        <div style={{ display: "flex", fontSize: "12px" }}>
          <div>
            <GoDotFill color={CardPriority.color} size={"16px"} />
          </div>
          {CardPriority.name}
        </div>
        <div>
          <TbDots
            size={"23px"}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
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
                  handleModelClose={() => {
                    triggerReFetch();
                    setShowEditModal(false);
                    setShowMenu(false);
                  }}
                />
              </Modal>
              <div onClick={handleCopyToClipboard}>Share</div>
              <div
                style={{ color: "red" }}
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </div>
              <Modal style={customStyles2} isOpen={deleteModal}>
                <h3>Are you sure you want to delete?</h3>
                <button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setDeleteModal(false);
                    setShowMenu(false);
                    handleDeleteCard(id);
                  }}
                >
                  Yes,Delete
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
              </Modal>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        style={{ fontWeight: "450", fontSize: "17.5px", marginBottom: "15px" }}
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
        <div className={styles.tasksContainer}>
          {tasks.map((task) => (
            <div key={task._id} className={styles.taskItem}>
              <input
                type="checkbox"
                id={`task-${task._id}`}
                checked={task.isDone}
                onChange={() => updateTaskStatus(task._id, !task.isDone)}
              />
              <label htmlFor={`task-${task._id}`}>{task?.content}</label>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      <div className={styles.cardGroup} style={{ marginTop: "10px" }}>
        {dueDate ? (
          <button style={dueDateStyle}>
            {format(new Date(dueDate), "do MMM")}
          </button>
        ) : (
          <span> </span>
        )}
        <div className={styles.btnGroup}>{StatusButtons()}</div>
      </div>
    </div>
  );
}

export default Card;
