import React, { useEffect, useState } from "react";
import styles from "./viewCard.module.css";
import { useParams } from "react-router-dom";
import logo from "..//../assets/codesandbox.svg";
import { GoDotFill } from "react-icons/go";
import cardApi from "..//../apis/CardApi";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ViewCard() {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cardId } = useParams();
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
  const CardPriority = priorities[cardData?.priority];
  const fetchCardData = async () => {
    const response = await cardApi.getCard(cardId);
    setCardData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCardData();
  }, []);
  return (
    <div className={styles.viewCardContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <p>Promanage</p>
      </div>
      <div className={styles.cardContainer}>
        {loading ? (
          <div>
            <h1>
              <Skeleton style={{ width: "40%", height: "30px" }} />
            </h1>
            <Skeleton count={5} height={"30px"} style={{ marginTop: "25px" }} />
          </div>
        ) : (
          <div>
            <div className={styles.priorityGroup}>
              <div style={{ marginTop: "-2px" }}>
                <GoDotFill color={CardPriority?.color} size={"16px"} />
              </div>
              {CardPriority?.name}
            </div>
            <div className={styles.title}>{cardData?.title}</div>
            <p className={styles.checklist}>
              Checklist({cardData?.tasks.filter((task) => task.isDone).length}/
              {cardData?.tasks.length})
            </p>
            <div className={styles.tasksContainer}>
              {cardData?.tasks.map((task) => (
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
            {cardData?.dueDate ? (
              <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                <div>Due Date</div>
                <button className={styles.dueDate}>
                  {format(new Date(cardData?.dueDate), "do MMM")}
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCard;
