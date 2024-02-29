import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import userApi from "../../apis/UserApi";
import CornerStoneLoader from "../loaders/CornerStoneLoader";
import Navbar from "../navbar/Navabar";

const AppContext = React.createContext();
function AppLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const checkAuth = async () => {
    try {
      const response = await userApi.verifyToken();
      if (response?.message !== "ok") {
        navigate("/login");
      } else {
        setUser(response?.name);
        setLoading(false);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    checkAuth();
  }, [navigate]);
  const appProps = {
    username: user,
  };
  return (
    <div>
      {loading ? (
        <CornerStoneLoader />
      ) : (
        <AppContext.Provider value={appProps}>
          <div style={{ display: "flex" }}>
            <Navbar />
            <Outlet />
          </div>
        </AppContext.Provider>
      )}
    </div>
  );
}
export function useAppContext() {
  return React.useContext(AppContext);
}

export default AppLayout;
