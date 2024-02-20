import React, { useState } from "react";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Banner from "../../components/banner/Banner";
import styles from "./login.module.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Banner />
      </div>
      <div className={styles.loginContainer}>
        <p>Login</p>
        <div className={styles.inputGroup}>
          <MdOutlineLocalPostOffice
            className={styles.postIcon}
            color="#828282"
            size={"33px"}
          />
          <input type="email" placeholder="Email" required spellCheck="false" />
          <CiLock className={styles.lockIcon} color="#828282" size={"33px"} />
          <input
            style={{ paddingRight: "50px" }}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          {showPassword ? (
            <FiEyeOff
              className={styles.eyeOffIcon}
              color="#828282"
              size={"23px"}
              onClick={handlePasswordVisibility}
            />
          ) : (
            <FiEye
              className={styles.eyeOnIcon}
              color="#828282"
              size={"23px"}
              onClick={handlePasswordVisibility}
            />
          )}
        </div>
        <button className={styles.loginBtn}>Login</button>
        <span>Have no account yet?</span>
        <button className={styles.registerBtn}>Register</button>
      </div>
    </div>
  );
}

export default Login;
