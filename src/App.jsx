
import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./components/winning_combination.js";

const INITIAL_GAMEBOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAMEBOARD.map(preArr=>[...preArr])];

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedActivePlayer(gameTurn){
    let currentPlayer = 'X';
    if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
      currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveWinner(gameBoardParam,playersParam){
  let winner = null;
  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoardParam[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoardParam[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =  gameBoardParam[combinations[2].row][combinations[2].column];
   
    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      secondSquareSymbol ===thirdSquareSymbol){
        winner = playersParam[firstSquareSymbol];
      }
  }
  return winner;
}


function App() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurnCount,setGameTurnCount] = useState([]);
  //gameTurnCount state controlls the whole game logic here.

  const activePlayer = derivedActivePlayer(gameTurnCount);
  const gameBoard = deriveGameBoard(gameTurnCount);
  const winner =  deriveWinner(gameBoard,players);
  const hasDraw = gameTurnCount.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurnCount((preTurn)=>{
      const currentPlayer = derivedActivePlayer(preTurn);
      const updatedTurns = [
          {square: {row: rowIndex,col: colIndex}, player: currentPlayer},
          ...preTurn
       ]
       return updatedTurns;
    })
  }

  function restartHandle(){
    setGameTurnCount([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prePlayer =>{
      return {...prePlayer, [symbol]: newName}
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className='highlight-player'>
        <Player 
          initailName={PLAYERS.X} 
          symbol='X' 
          isActive={activePlayer==='X'}
          onChangeName={handlePlayerNameChange}
          />

        <Player 
          initailName={PLAYERS.O} 
          symbol='O' 
          isActive={activePlayer==='O'}
          onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restart={restartHandle}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
          />
      </div>
      <Log gameList={gameTurnCount} />
    </main>
  )
}

export default App
