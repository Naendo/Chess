import { PieceColor, getPositionData } from "./chess";

export interface CheckMove {
  position: number[];
  originIndex: number;
  color: PieceColor;
}

export function getColor(bitValue: number) {
  return bitValue < 32 ? PieceColor.White : PieceColor.Black;
}
export function isInBoundBound(index: number) {
  const { row, column } = getPositionData(index);
  return row <= 8 && column <= 8 && row >= 0 && column >= 0;
}

export function moveStraight(direction: number, move: CheckMove) {
  const validMoves = Array<number>();
  let index = move.originIndex + direction;

  while (isInBoundBound(index)) {
    const bitValue = move.position[index];

    if (bitValue === 0) {
      // TODO: Pieces are not bound to board physics, rook can move from 8 -> 7 because its in range of its direction
      validMoves.push(index);
      index += direction;
      continue;
    }

    if (move.color !== getColor(bitValue)) {
      validMoves.push(index);
    }
    break;
  }
  return validMoves;
}
