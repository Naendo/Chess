import { PieceColor, PieceType } from "./chess";

export interface Move {
  position: number[];
  originIndex: number;
  color: PieceColor;
  piece: PieceType;
}

export function getColor(bitValue: number) {
  return bitValue < 32 ? PieceColor.White : PieceColor.Black;
}

export const SquaresToEdge = initialize();
const DirectionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

export function generateStraightMoves(move: Move) {
  const validMoves = Array<number>();

  const startIndex = move.piece === PieceType.Bishop ? 4 : 0;
  const endIndex = move.piece === PieceType.Rook ? 4 : 8;

  for (let directionIndex = startIndex; directionIndex < endIndex; directionIndex++) {
    for (let n = 0; n < SquaresToEdge[move.originIndex][directionIndex]; n++) {
      const target = move.originIndex + DirectionOffsets[directionIndex] * (n + 1);
      const targetPiece = move.position[target];

      if (targetPiece === 0) {
        validMoves.push(target);
        continue;
      }

      if (move.color !== getColor(targetPiece)) {
        validMoves.push(target);
      }
      break;
    }
  }
  return validMoves;
}

function initialize() {
  const boardBounds: number[][] = [];

  for (let file = 0; file < 8; file++) {
    for (let rank = 0; rank < 8; rank++) {
      const north = 7 - rank;
      const south = rank;
      const west = file;
      const east = 7 - file;

      const squareIndex = rank * 8 + file;

      boardBounds[squareIndex] = [
        north,
        south,
        west,
        east,
        Math.min(north, west),
        Math.min(south, east),
        Math.min(north, east),
        Math.min(south, west),
      ];
    }
  }
  return boardBounds;
}
