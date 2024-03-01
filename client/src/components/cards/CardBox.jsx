import React, { useState, useEffect, Children } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import styles from "./cardbox.module.css";
import Card from "./Card";
import Modal from "react-modal";
import CardModal from "../modals/CardModal";
import toast, { Toaster } from "react-hot-toast";
import cardApi from "../../apis/CardApi";

function CardBox({ status, filter, refresh, refreshFunc }) {
  const [collapse, setCollapse] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardsData, setCardsData] = useState(null);
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

  const fetchCardsData = async () => {
    try {
      const response = await cardApi.getCards(
        filter.toLowerCase().replace(/\s/g, ""),
        status.toLowerCase().replace(/\s/g, "")
      );
      setCardsData(response.data);
    } catch (error) {
      console.error("Error fetching cards data:", error);
    }
  };
  useEffect(() => {
    fetchCardsData();
  }, [filter, status, refresh, modalOpen]);

  return (
    <div className={styles.cardBox}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.cardBoxGroup}>
        <div style={{ fontWeight: "600" }}>{status}</div>
        <div>
          {status === "To do" ? (
            <IoIosAdd size={"23px"} onClick={() => setModalOpen(true)} />
          ) : (
            <></>
          )}
          <VscCollapseAll
            size={"20px"}
            color="#767575"
            onClick={() => setCollapse(false)}
          />
        </div>
      </div>
      <div>
        <Modal
          style={customStyles}
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          ariaHideApp={false}
        >
          <CardModal handleModelClose={() => setModalOpen(false)} />
        </Modal>
      </div>
      <div className={styles.cardList}>
        {cardsData &&
          cardsData.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              priority={card.priority}
              title={card.title}
              tasks={card.tasks}
              dueDate={card.dueDate}
              status={card.status}
              collapse={collapse}
              handleCollapse={() => setCollapse(true)}
              triggerReFetch={() => refreshFunc()}
            />
          ))}
      </div>
    </div>
  );
}

export default CardBox;
