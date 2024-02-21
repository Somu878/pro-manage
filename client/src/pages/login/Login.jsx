import React, { useState } from "react";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Banner from "../../components/banner/Banner";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../apis/Auth";
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const response = await LoginUser(loginData.email, loginData.password);
      localStorage.setItem("token", response.token);
      if (response.status === "success") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
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
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            spellCheck="false"
            value={loginData.email}
            onChange={handleInputChange}
          />
          <CiLock className={styles.lockIcon} color="#828282" size={"33px"} />
          <input
            style={{ paddingRight: "50px" }}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={loginData.password}
            onChange={handleInputChange}
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
        <button className={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>
        <span>Have no account yet?</span>
        <button
          className={styles.registerBtn}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
