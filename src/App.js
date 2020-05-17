import React, { useState } from "react";
import "./App.css";
import "./game.css";
import utils from "./utilities";
import {
  getCandidates,
  getWrongs,
  getAvailableNumbers,
  colors,
  isAllUsed as allUsed,
} from "./utilities";

const StarMatch = (props) => {
  const [numberOfStars, setNumberOfStars] = useState(utils.random(1, 9));

  const [currentNumberDetails, setCurrentNumberDetails] = useState(() => {
    return new Array(9).fill(colors.available);
  });
  const [timer, setTimer] = useState(props.timeout);
  const [gameStatus, setGameStatus] = useState("active");

  const handler = (value, backgroundColor) => {
    let newArr = [];

    if (backgroundColor !== colors.used) {
      // if color is used then we are not doing anything on it

      if (backgroundColor === colors.wrong) {
        // incase if click on wrong color

        newArr = currentNumberDetails.map((item, index) => {
          return index === value - 1 ? colors.available : item;
        });
        setCurrentNumberDetails(newArr);
        const sum = utils.sum(getWrongs(newArr));

        if (sum < numberOfStars) {
          const newArr2 = newArr.map((item, index) => {
            return item === colors.wrong ? colors.candidate : item;
          });
          newArr = newArr2;
          setCurrentNumberDetails(newArr);
        } else if (sum === numberOfStars) {
          const newArr2 = newArr.map((item, index) => {
            return item === colors.wrong ? colors.used : item;
          });
          newArr = newArr2;
          const max = Math.max(...getAvailableNumbers(newArr));
          setCurrentNumberDetails(newArr);
          setNumberOfStars(utils.randomSumIn(getAvailableNumbers(newArr), max));
        }
      } else if (backgroundColor === colors.candidate) {
        // in case if click on candidate again
        newArr = currentNumberDetails.map((item, index) =>
          index === value - 1 ? colors.available : item
        );
        setCurrentNumberDetails(newArr);
      } else if (
        numberOfStars === value &&
        utils.sum(getWrongs(currentNumberDetails)) === 0 &&
        utils.sum(getCandidates(currentNumberDetails)) === 0
      ) {
        newArr = currentNumberDetails.map((item, index) => {
          return index === value - 1 ? colors.used : item;
        });

        const max = Math.max(...getAvailableNumbers(newArr));
        setCurrentNumberDetails(newArr);
        setNumberOfStars(utils.randomSumIn(getAvailableNumbers(newArr), max));
      } else {
        // if we already have some wrongs clicked

        if (utils.sum(getWrongs(currentNumberDetails)) !== 0) {
          newArr = currentNumberDetails.map((item, index) => {
            return index === value - 1 ? colors.wrong : item;
          });

          setCurrentNumberDetails(newArr);
        } else {
          let newArr = currentNumberDetails;
          newArr[value - 1] = colors.candidate;

          setCurrentNumberDetails(newArr);

          const sumCandidates = utils.sum(getCandidates(newArr));
          const sumWrongs = utils.sum(getWrongs(newArr));

          if (sumCandidates === numberOfStars) {
            newArr = currentNumberDetails.map((item) => {
              return item === colors.candidate ? colors.used : item;
            });

            setCurrentNumberDetails(newArr);
            const max = Math.max(...getAvailableNumbers(newArr));
            setNumberOfStars(
              utils.randomSumIn(getAvailableNumbers(newArr), max)
            );
          } else if (sumCandidates - sumWrongs < numberOfStars) {
            newArr = currentNumberDetails.map((item) => {
              return item === colors.candidate ? colors.candidate : item;
            });
            setCurrentNumberDetails(newArr);
          } else if (sumCandidates - sumWrongs > numberOfStars) {
            newArr = currentNumberDetails.map((item) => {
              return item === colors.candidate ? colors.wrong : item;
            });
            setCurrentNumberDetails(newArr);
          }
        }
      }
    }
  };

  const resetStates = () => {
    setCurrentNumberDetails(new Array(9).fill(colors.available));
    setNumberOfStars(utils.random(1, 9));
  };

  const concludeGame = (timer) => {
    if (timer >= 0 && allUsed(currentNumberDetails) === true) {
      props.stopCount(props.intervalId);
      setGameStatus("win");
      setNumberOfStars(0);
    } else if (timer > 0) {
      //do nothing as game is in active state
    } else if (timer <= 0) {
      props.stopCount(props.intervalId);
      setGameStatus("lose");
      setNumberOfStars(0);
    }
  };

  if (timer !== props.timeout) {
    setTimer(props.timeout);
    concludeGame(props.timeout);
  }
  const onClick = () => {
    resetStates();
    setGameStatus("active");
    props.resetCount();
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus === "lose" ? (
            <div className="game-done">
              {" "}
              <span style={redColor} className="message">
                You have lost game
              </span>
              <button
                style={{ color: "green" }}
                className="message"
                onClick={() => onClick()}
              >
                Try Again
              </button>
            </div>
          ) : gameStatus === "win" ? (
            <div className="game-done">
              {" "}
              <span className="message" style={greenColor}>
                You have won game
              </span>
              <button className="message" onClick={() => onClick()}>
                Play Again
              </button>
            </div>
          ) : (
                ""
              )}

          {utils.range(1, numberOfStars).map((number) => (
            <div key={number} className="star" />
          ))}
        </div>
        <div className="right">
          {utils.range(1, 9).map((buttonId) => (
            <button
              key={buttonId}
              style={{ backgroundColor: currentNumberDetails[buttonId - 1] }}
              className="number"
              value={buttonId}
              disabled={
                gameStatus === "lose" || gameStatus === "win" ? true : false
              }
              onClick={(element) =>
                handler(buttonId, currentNumberDetails[buttonId - 1])
              }
            >
              {buttonId}
            </button>
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {props.timeout}</div>
    </div>
  );
};

const redColor = {
  color: "red",
};
const greenColor = {
  color: "green",
};

export default StarMatch;
