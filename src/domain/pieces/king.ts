import { Move, SquaresToEdge, getColor } from "../piece";

export function checkKing(move: Move) {
  const validMoves: number[] = [];
  const directions = [8, -8, -1, 1, -8, 8, 7, -9, 9, -7];

  for (let directionIndex = 0; directionIndex < directions.length; directionIndex++) {
    if (SquaresToEdge[move.originIndex][directionIndex] === 0) continue;

    const destination = move.originIndex + directions[directionIndex];
    if (move.position[destination] === 0 || getColor(move.position[destination]) !== move.color)
      validMoves.push(destination);
  }
  return validMoves;
}
