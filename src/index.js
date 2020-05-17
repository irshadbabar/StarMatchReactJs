import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const mainfun = (timeout, intervalId, stopCount, resetCount) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        timeout={timeout}
        intervalId={intervalId}
        resetCount={resetCount}
        stopCount={stopCount}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );

  serviceWorker.unregister();
};

const resetCount = (intervalId) => {
  clearInterval(intervalId);
  startGame();
};
const stopCount = (intervalId) => {
  clearInterval(intervalId);
};

const startGame = () => {
  let i = 15;
  const intervalId = setInterval(function () {
    if (i < 0 || i === 0) {
      mainfun(0, intervalId, stopCount, resetCount);
      clearInterval(intervalId);
    } else {
      mainfun(i--, intervalId, stopCount, resetCount);
    }
  }, 1000);
};
startGame();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
