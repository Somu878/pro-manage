import React, { useState, useEffect } from "react";
import styles from "./cardmodal.module.css";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import cardApi from "..//../apis/CardApi";
function CardModal({ mode, cardId, handleModelClose, trigger }) {
  const priorities = {
    high: {
      color: "#FF2473",
      name: "High Priority",
      value: "high",
    },
    moderate: {
      color: "#18B0FF",
      name: "Moderate Priority",
      value: "moderate",
    },
    low: {
      color: "#63C05B",
      name: "Low Priority",
      value: "low",
    },
  };
  const prioritiesArray = Object.values(priorities);
  const [tasks, setTasks] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [cardData, setCardData] = useState({
    title: "",
    priority: null,
    tasks: [],
    dueDate: "",
  });
  const addTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { _id: Date.now(), content: "", isDone: false },
    ]);
  };
  const handleTaskChange = (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };
  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority === selectedPriority ? null : priority);
    setCardData((prevData) => ({ ...prevData, priority }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSave = async (e) => {
    e.preventDefault();

    const updatedCardData = {
      ...cardData,
      tasks: tasks.map((task) => ({
        content: task.content,
        isDone: task.isDone,
      })),
    };
    setCardData(updatedCardData);

    if (mode === "edit") {
      await handleEditCard(updatedCardData);
      trigger;
    } else {
      await handleAdd(updatedCardData);
    }

    handleModelClose();
  };

  const fetchInitialCardData = async () => {
    try {
      const response = await cardApi.getCard(cardId);
      const fetchedData = response.data;
      setCardData((prevData) => ({
        ...prevData,
        title: fetchedData.title,
        tasks: fetchedData.tasks || [],
        priority: fetchedData.priority || null,
      }));
      setSelectedPriority(fetchedData.priority);
      setTasks(fetchedData.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (mode === "edit") {
      fetchInitialCardData();
    }
  }, [mode, cardId]);
  const handleEditCard = async (cardData) => {
    try {
      const response = await cardApi.updateCard(cardId, cardData);
      trigger;
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = async (cardData) => {
    await cardApi.addCard(cardData);
    toast.success("New card added successfully");
  };
  return (
    <form onSubmit={handleSave} className={styles.cardModalContainer}>
      <div className={styles.form}>
        <div>
          <div className={styles.label}>
            Title <span>*</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Enter Task Title"
            className={styles.titleInput}
            value={cardData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.label}>
            Select Priority <span>*</span>
          </div>
          <div>
            {prioritiesArray.map((item) => (
              <span
                className={`${styles.priorityBtn} ${
                  selectedPriority === item.value ? styles.activePriority : ""
                }`}
                key={item.value}
                onClick={() => handlePriorityClick(item.value)}
              >
                <span>
                  <GoDotFill
                    style={{ marginRight: "5px" }}
                    size={"14px"}
                    color={item.color}
                    className={styles.dotIcon}
                  />
                </span>
                {item.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.label}>
            Checklist({tasks.filter((task) => task.isDone).length}/
            {tasks.length})
          </div>
          <div className={styles.tasksContainer}>
            {tasks.map((task) => (
              <div key={task._id} className={styles.taskItem}>
                <input
                  type="checkbox"
                  className={styles.taskCheck}
                  id={`task-${task._id}`}
                  checked={task.isDone}
                  onChange={(e) =>
                    handleTaskChange(task._id, "isDone", e.target.checked)
                  }
                />
                <input
                  type="text"
                  className={styles.taskInput}
                  id={`task-content-${task._id}`}
                  value={task.content}
                  onChange={(e) =>
                    handleTaskChange(task._id, "content", e.target.value)
                  }
                  required
                />
                <MdDelete
                  className={styles.deleteIcon}
                  color="red"
                  size={"23px"}
                  onClick={() => handleDeleteTask(task._id)}
                />
              </div>
            ))}
          </div>
          <p className={styles.addTask} onClick={addTask}>
            + Add task
          </p>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <button
          className={styles.dueDateBtn}
          onClick={() => setShowCalender(!showCalender)}
        >
          Select Due Date
        </button>
        {showCalender ? (
          <input
            type="date"
            name="dueDate"
            value={cardData.dueDate}
            onChange={handleInputChange}
            className={styles.dueDateInput}
          />
        ) : (
          <></>
        )}
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            className={styles.cancelBtn}
            onClick={() => handleModelClose()}
          >
            Cancel
          </button>
          <button className={styles.saveBtn} type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default CardModal;
