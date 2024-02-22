import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
// import io from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import CornerStoneLoader from "./components/loaders/CornerStoneLoader";
import Settings from "./pages/settings/Settings";
import Analytics from "./pages/analytics/Analytics";
import AppLayout from "./components/layouts/AppLayout";
const LazyRegister = lazy(() => import("./pages/register/Register"));
const LazyLogin = lazy(() => import("./pages/login/Login"));

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
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path={"/login"}
          element={
            <Suspense fallback={<CornerStoneLoader />}>
              <LazyLogin />
            </Suspense>
          }
        />
        <Route
          path={"/register"}
          element={
            <Suspense fallback={<CornerStoneLoader />}>
              <LazyRegister />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
