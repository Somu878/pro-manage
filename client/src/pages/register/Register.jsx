import React, { useState } from "react";
import Banner from "../../components/banner/Banner";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CiUser, CiLock } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./register.module.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Banner />
      </div>
      <div className={styles.registerContainer}>
        <p>Register</p>
        <div className={styles.inputGroup}>
          <CiUser className={styles.userIcon} color="#828282" size={"33px"} />
          <input type="text" placeholder="Name" required spellCheck="false" />
          <MdOutlineLocalPostOffice
            className={styles.postIcon}
            color="#828282"
            size={"33px"}
          />
          <input type="email" placeholder="Email" required spellCheck="false" />
          <CiLock className={styles.lockIcon1} color="#828282" size={"33px"} />
          <input
            style={{ paddingRight: "50px" }}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          {showPassword ? (
            <FiEyeOff
              className={styles.eyeOffIcon1}
              color="#828282"
              size={"23px"}
              onClick={handlePasswordVisibility}
            />
          ) : (
            <FiEye
              className={styles.eyeOnIcon1}
              color="#828282"
              size={"23px"}
              onClick={handlePasswordVisibility}
            />
          )}
          <CiLock className={styles.lockIcon2} color="#828282" size={"33px"} />
          <input
            style={{ paddingRight: "50px" }}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
          />
          {showConfirmPassword ? (
            <FiEyeOff
              className={styles.eyeOffIcon2}
              color="#828282"
              size={"23px"}
              onClick={handleConfirmPasswordVisibility}
            />
          ) : (
            <FiEye
              className={styles.eyeOnIcon2}
              color="#828282"
              size={"23px"}
              onClick={handleConfirmPasswordVisibility}
            />
          )}
        </div>
        <button className={styles.registerBtn}>Register</button>
        <span>Have an account?</span>
        <button className={styles.loginBtn}>Login</button>
      </div>
    </div>
  );
}

export default Register;
