import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Board from "./Components/Board.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);
