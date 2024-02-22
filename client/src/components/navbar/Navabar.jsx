import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import logo from "..//../assets/codesandbox.svg";
import board from "..//../assets/board.svg";
import analytics from "..//../assets/database.svg";
import settings from "..//../assets/settings.svg";
import { IoExitOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Navabar() {
  const [activeLink, setActiveLink] = useState("board");
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveLink("board");
    } else if (location.pathname === "/analytics") {
      setActiveLink("analytics");
    } else if (location.pathname === "/settings") {
      setActiveLink("settings");
    }
  }, [location.pathname]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navLinks}>
        <div className={styles.navGroup} style={{ marginTop: "20px" }}>
          <img src={logo} alt="logo" />
          <p style={{ fontWeight: "600", fontSize: "17px", color: "black" }}>
            Promanage
          </p>
        </div>
        <Link
          to={"/"}
          style={{ marginTop: "10px" }}
          className={`${styles.navGroup} ${
            activeLink === "board" ? styles.activeLink : ""
          }`}
        >
          <img src={board} alt="board" />
          <p>Board</p>
        </Link>
        <Link
          to={"/analytics"}
          className={`${styles.navGroup} ${
            activeLink === "analytics" ? styles.activeLink : ""
          }`}
        >
          <img src={analytics} alt="analytics" />
          <p>Analytics</p>
        </Link>
        <Link
          to={"/settings"}
          className={`${styles.navGroup} ${
            activeLink === "settings" ? styles.activeLink : ""
          }`}
        >
          <img src={settings} alt="settings" />
          <p>Settings</p>
        </Link>
      </div>
      <div
        className={styles.navGroup}
        style={{ marginBottom: "30%", cursor: "pointer" }}
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        <IoExitOutline size={"25px"} color="#CF3636" />
        <p style={{ color: "#CF3636" }}>Logout</p>
      </div>
    </div>
  );
}

export default Navabar;
