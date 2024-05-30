import { CheckMove, moveStraight } from "../piece";

export function checkBishop(move: CheckMove) {
  const validMoves = Array<number>();
  const directions = [7, 9, -7, -9];
  directions.forEach((direction) => validMoves.push(...moveStraight(direction, move)));
  return validMoves;
}
