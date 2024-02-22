import React, { useState } from "react";
import styles from "./settings.module.css";
import { CiLock, CiUser } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
function Settings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });
  const handleOldPasswordVisibility = () => {
    setShowOldPassword(true);
    setTimeout(() => {
      setShowOldPassword(false);
    }, 2000);
  };

  const handleNewPasswordVisibility = () => {
    setShowNewPassword(true);
    setTimeout(() => {
      setShowNewPassword(false);
    }, 2000);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className={styles.settingsContainer}>
      <form>
        <p>Settings</p>
        <div className={styles.inputGroup}>
          <span>
            <CiUser size={"23px"} className={styles.Icon1} />
          </span>
          <input
            type="text"
            name="name"
            required
            spellCheck="false"
            placeholder="Name"
            value={updatedData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <span>
            <CiLock size={"25px"} className={styles.Icon2} />
          </span>
          <input
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            required
            spellCheck="false"
            placeholder="Old Password"
            value={updatedData.oldPassword}
            onChange={handleInputChange}
          />
          <span>
            {showOldPassword ? (
              <FiEyeOff
                className={styles.eyeOffIcon1}
                color="#828282"
                size={"23px"}
                onClick={handleOldPasswordVisibility}
              />
            ) : (
              <FiEye
                className={styles.eyeOnIcon1}
                color="#828282"
                size={"23px"}
                onClick={handleOldPasswordVisibility}
              />
            )}
          </span>
        </div>
        <div className={styles.inputGroup}>
          <span>
            <CiLock size={"25px"} className={styles.Icon3} />
          </span>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            required
            spellCheck="false"
            placeholder="New Password"
            value={updatedData.newPassword}
            onChange={handleInputChange}
          />
          <span>
            {showNewPassword ? (
              <FiEyeOff
                className={styles.eyeOffIcon2}
                color="#828282"
                size={"23px"}
                onClick={handleNewPasswordVisibility}
              />
            ) : (
              <FiEye
                className={styles.eyeOnIcon2}
                color="#828282"
                size={"23px"}
                onClick={handleNewPasswordVisibility}
              />
            )}
          </span>
        </div>
        <button className={styles.updateBtn}>Update</button>
      </form>
    </div>
  );
}

export default Settings;
