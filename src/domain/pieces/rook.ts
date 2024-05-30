import { CheckMove, moveStraight } from "../piece";

export function checkRook(move: CheckMove) {
  const validMoves = Array<number>();
  const directions = [8, 1, -8, -1];
  directions.forEach((direction) => validMoves.push(...moveStraight(direction, move)));
  return validMoves;
}
