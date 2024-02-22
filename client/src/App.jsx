import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
// import io from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Authlayout from "./components/layouts/AuthLayout";
// import AppLayout from "./components/layouts/AppLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CornerStoneLoader from "./components/loaders/CornerStoneLoader";
import Settings from "./pages/settings/Settings";
import Analytics from "./pages/analytics/Analytics";
const AppLayout = lazy(() => import("./components/layouts/AppLayout"));
const AuthLayout = lazy(() => import("./components/layouts/AuthLayout"));

function App() {
  // const socket = io("http://localhost:9000");
  // useEffect(() => {
  //   socket.on("yourCustomEvent", (data) => {
  //     console.log("Received data from server:", data);
  //   });
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <Suspense fallback={<CornerStoneLoader />}>
              <AppLayout />
            </Suspense>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path={"/"}
          element={
            <Suspense fallback={<CornerStoneLoader />}>
              <AuthLayout />
            </Suspense>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
