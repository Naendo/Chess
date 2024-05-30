import { CheckMove } from "../piece";
import { checkBishop } from "./bishop";
import { checkRook } from "./rook";

export function checkQueen(move: CheckMove) {
  return checkRook(move).concat(checkBishop(move));
}
