import React from "react";
import Navabar from "../navbar/Navabar";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Navabar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
