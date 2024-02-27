import React, { useEffect, useState } from "react";
import Navabar from "../navbar/Navabar";
import { Outlet, useNavigate } from "react-router-dom";
import userApi from "../../apis/UserApi";
import CornerStoneLoader from "..//../components/loaders/CornerStoneLoader";
function AppLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const checkAuth = async () => {
    try {
      const response = await userApi.verifyToken();
      if (response?.message !== "ok") {
        navigate("/login");
      } else {
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
  return (
    <div>
      {loading ? (
        <CornerStoneLoader />
      ) : (
        <div style={{ display: "flex" }}>
          <Navabar />
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default AppLayout;
