import { PieceColor, getPositionData } from "../chess";
import { Move, getColor } from "../piece";

export function checkPawn(move: Move) {
  const { row } = getPositionData(move.originIndex);

  const direction = move.color === PieceColor.White ? 8 : -8;
  const directions = move.color === PieceColor.White ? [9, 7] : [-7, -9];
  const validMoves = [];

  for (let index = 0; index < directions.length; index++) {
    const moveIndex = move.originIndex + directions[index];
    const bitValue = move.position[move.originIndex + directions[index]];
    if (bitValue !== 0 && getColor(bitValue) !== move.color) validMoves.push(moveIndex);
  }

  if (move.position[move.originIndex + direction] === 0) validMoves.push(move.originIndex + direction);

  if ((move.color === PieceColor.White && row === 2) || (move.color === PieceColor.Black && row === 7))
    if (move.position[move.originIndex + direction * 2] === 0 && move.position[move.originIndex + direction] === 0)
      validMoves.push(move.originIndex + direction * 2);

  return validMoves;
}
