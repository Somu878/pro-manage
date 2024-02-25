import React, { useState, useEffect } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import styles from "./cardbox.module.css";
import Card from "./Card";
import Modal from "react-modal";
import CardModal from "../modals/CardModal";
function CardBox({ statusName }) {
  const [collapse, setCollapse] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
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
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardBoxGroup}>
        <div style={{ fontWeight: "600" }}>{statusName}</div>
        <div>
          {statusName === "To-do" ? (
            <IoIosAdd size={"23px"} onClick={() => setModalOpen(true)} />
          ) : (
            <></>
          )}
          <VscCollapseAll
            size={"20px"}
            color="#767575"
            onClick={() => {
              setCollapse(false);
            }}
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
          <CardModal
            mode={"edit"}
            handleModelClose={() => setModalOpen(false)}
          />
        </Modal>
      </div>
      <div className={styles.cardList}>
        <Card
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
          handleCollapse={() => setCollapse(true)}
        />
        <Card
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
        />
      </div>
    </div>
  );
}

export default CardBox;
