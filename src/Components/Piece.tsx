import { useContext } from "react";
import { DropableItem, PieceColor, PieceType, getPieceFromBit, pieceTypeFromSymbol } from "../domain/chess";
import { useDrag } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { ChessState } from "../context/ChessState";

const defaultUri = "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/";

export default function Piece({ bitValue, index }: { bitValue: number; index: number }) {
  const [color, type] = getPieceFromBit(bitValue);
  const resource = getResource([color, type]);
  const chessState = useContext(ChessState);

  const drop: DropableItem = { bitValue: bitValue, index: index };

  const [, dragRef] = useDrag({
    type: NativeTypes.URL,
    item: drop,
    canDrag: () =>
      (color === PieceColor.White && chessState.whiteIsPlaying) || (color == PieceColor.Black && !chessState.whiteIsPlaying),
  });

  return (
    <>
      <div ref={dragRef} className="piece" style={{ backgroundImage: `url(${resource})` }}></div>
    </>
  );
}

function getResource([color, localType]: [color: PieceColor, localType: PieceType]): string {
  const pieceColor = PieceColor[color];
  const pieceType = PieceType[localType];

  if (pieceType === undefined) return "";

  const sign = pieceTypeFromSymbol.find((x) => x.value === localType);
  return defaultUri + pieceColor[0].toLowerCase() + sign?.key + ".png";
}
