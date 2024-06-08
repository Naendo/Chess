import { Chess } from "../domain/chess";
import { useState } from "react";
import Square from "./Square";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChessState } from "../context/ChessState";

const chess = new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

export default function Board() {
  const [position, onPosition] = useState<Array<number>>(chess.getPosition());
  const [whiteIsPlaying, changePlayer] = useState<boolean>(true);

  function dropPiece(origin: number, destination: number) {
    chess.move({ origin, destination });
    onPosition(chess.getPosition());
    changePlayer((prev) => !prev);
  }

  const squares = position.map<React.ReactElement>((bitBoardValue, index) => {
    return <Square key={index} onDrop={dropPiece} bitValue={bitBoardValue} index={index}></Square>;
  });

  return (
    <div className="main">
      <ChessState.Provider value={{ chess, whiteIsPlaying }}>
        <DndProvider backend={HTML5Backend}>
          <div className="board">{squares}</div>
        </DndProvider>
      </ChessState.Provider>
      <Sidebar whiteIsPlaying={whiteIsPlaying}></Sidebar>
    </div>
  );
}

function Sidebar({ whiteIsPlaying }: { whiteIsPlaying: boolean }) {
  return (
    <div className="board-sidebar">
      <div>
        {whiteIsPlaying ? <span className="bold">White&nbsp;</span> : <span className="bold">Black&nbsp;</span>}is playing!
      </div>
    </div>
  );
}
