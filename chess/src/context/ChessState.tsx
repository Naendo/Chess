import { createContext } from "react";
import { Chess } from "../domain/chess";

interface ChessStateType {
  whiteIsPlaying: boolean;
  chess: Chess;
}

export const ChessState = createContext<ChessStateType>(null!);
