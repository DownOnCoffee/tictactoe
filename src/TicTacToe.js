import { useState,useEffect } from "react";
import './styles.css'


function Square({ value, squareclick }) {
  return (
    <button className="square" onClick={squareclick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [nextchance, setnextchance] = useState(true);
  const [winner, setwinner] = useState(null);
  let sign;

  //Playing the game
  function handleclick(i) {
    if (winner === null && squares[i] === null) {
      const newarr = squares.slice();
      sign = nextchance === true ? "X" : "O";
      setnextchance(!nextchance);
      newarr[i] = sign;
      setsquares(newarr);
     
      const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let j = 0; j < winningPatterns.length; j++) {
        const [x, y, z] = winningPatterns[j];
        if (
          newarr[x] &&
          newarr[x] === newarr[y] &&
          newarr[y] === newarr[z] &&
          newarr[z] === newarr[x]
        ) {
          setwinner(newarr[x]);
          return;
        }
      }
    }
  }

  //  Deciding the winner
  let status;
  if (winner === null ) {
    if (areAllElementsFilled(squares) === true) {
      status = "It is a tie!";
    }
    else{
      status = "Next player: " + (nextchance ? "X" : "O");

    }
  } 
  else if (winner === "X") {
    status = "Winner: " + winner;
  } 
  else if (winner === "O") {
    status = "Winner: " + winner;
  }

  //Restart the game
  const restart=()=>{
    setsquares(Array(9).fill(null));
    setwinner(null);
  };
 


  return (
    <>
  
    <h1>TIC-TAC-TOE</h1>
      <div className="board">
        <div className="board-rows">
          <Square value={squares[0]} squareclick={() => handleclick(0)} />
          <Square value={squares[1]} squareclick={() => handleclick(1)} />
          <Square value={squares[2]} squareclick={() => handleclick(2)} />
        </div>
        <div className="board-rows">
          <Square value={squares[3]} squareclick={() => handleclick(3)} />
          <Square value={squares[4]} squareclick={() => handleclick(4)} />
          <Square value={squares[5]} squareclick={() => handleclick(5)} />
        </div>
        <div className="board-rows">
          <Square value={squares[6]} squareclick={() => handleclick(6)} />
          <Square value={squares[7]} squareclick={() => handleclick(7)} />
          <Square value={squares[8]} squareclick={() => handleclick(8)} />
        </div>
      </div>
      <div className="status">{status}</div>
      <br></br>
      <button onClick={restart} className="restartbtn">Restart game</button>
         
    </>
  );
}
function areAllElementsFilled(arr) {
  return arr.every((element) => {
    // Test if the element is not null, undefined, or an empty string
    return element !== null && element !== undefined && element !== "";
  });
}
