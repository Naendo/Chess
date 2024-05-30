import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { DropableItem, getPositionData } from "../domain/chess";
import { useContext } from "react";
import { ChessState } from "../context/ChessState";

interface SquareProps {
  bitValue: number;
  index: number;
  onDrop: (origin: number, destination: number) => void;
}

export default function Square({ bitValue, index: index, onDrop }: SquareProps) {
  const chessState = useContext(ChessState);

  const [{ canDrop }, drop] = useDrop(
    {
      accept: NativeTypes.URL,
      canDrop: (item) => index != item.index && chessState.chess.isValidMove(item.index, index),
      drop: (item: DropableItem) => {
        onDrop(item.index, index);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    },
    [bitValue, index]
  );

  return (
    <div
      ref={drop}
      className={`square ${isWhite(index) ? "white" : "black"} ${canDrop ? "yellow" : ""} ${
        canDrop && bitValue !== 0 ? "take" : ""
      }`}>
      <span className="number">
        {index} - B: {bitValue}
      </span>
      {bitValue !== 0 && <Piece bitValue={bitValue} index={index}></Piece>}
    </div>
  );
}

function isWhite(index: number) {
  if (index < 8) return index % 2 !== 0;
  // 22 = row 2 & column 6
  const { row, column } = getPositionData(index);
  return (row % 2 === 0 && column % 2 === 0) || (row % 2 !== 0 && column % 2 !== 0);
}
