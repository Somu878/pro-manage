import React, { useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const socket = io("http://localhost:9000");
  useEffect(() => {
    socket.on("yourCustomEvent", (data) => {
      console.log("Received data from server:", data);
    });
  }, []);
  return (
    <>
      <h1>hello</h1>
      <button
        onClick={() => {
          socket.disconnect();
        }}
      >
        click
      </button>
    </>
  );
}

export default App;
