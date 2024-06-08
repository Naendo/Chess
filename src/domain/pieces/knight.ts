import { getPositionData } from "../chess";
import { Move, getColor } from "../piece";

export function checkKnight(move: Move) {
  const validMoves: number[] = [];
  const directions = [15, 6, -15, -17, 17, 10, -6, -10];

  for (let directionIndex = 0; directionIndex < directions.length; directionIndex++) {
    const destination = move.originIndex + directions[directionIndex];

    const originData = getPositionData(move.originIndex);
    const destinationData = getPositionData(destination);

    const changedColumn = Math.abs(originData.column - destinationData.column);
    const changedRow = Math.abs(originData.row - destinationData.row);

    if ((changedColumn === 2 && changedRow === 1) || (changedRow === 2 && changedColumn === 1)) {
      if (move.position[destination] === 0 || getColor(move.position[destination]) !== move.color)
        validMoves.push(destination);
    }
  }
  return validMoves;
}
