import { Move, generateStraightMoves } from "./piece";
import { checkKing as generateKing } from "./pieces/king";
import { checkKnight as generateKnight } from "./pieces/knight";
import { checkPawn as generatePawn } from "./pieces/pawn";

export enum PieceType {
  None = 0,
  King = 1,
  Pawn = 2,
  Knight = 3,
  Bishop = 4,
  Rook = 5,
  Queen = 6,
}

export interface DropableItem {
  bitValue: number;
  index: number;
}

export enum PieceColor {
  White = 16,
  Black = 32,
}

export const pieceTypeFromSymbol: Array<{ key: string; value: PieceType }> = [
  { key: "k", value: PieceType.King },
  { key: "p", value: PieceType.Pawn },
  { key: "n", value: PieceType.Knight },
  { key: "b", value: PieceType.Bishop },
  { key: "r", value: PieceType.Rook },
  { key: "q", value: PieceType.Queen },
];

export const getPieceFromBit = (bitValue: number): [PieceColor, PieceType] =>
  bitValue < PieceColor.White + PieceType.Queen + 1
    ? [PieceColor.White, bitValue - PieceColor.White]
    : [PieceColor.Black, bitValue - PieceColor.Black];

export const getPositionData = (index: number) => {
  const position = index / 8;
  return {
    row: Math.floor(position) + 1,
    column: position === 0 ? 1 : (position - Math.floor(position)) * 8,
  };
};

export class Chess {
  private position: Array<number> = Array(64);

  constructor(fen: string) {
    this.applyPosition(fen);
  }

  public isValidMove(originIndex: number, destinationIndex: number) {
    const moves = this.getValidMoves(originIndex);
    return moves.includes(destinationIndex);
  }

  // To check for king checks, keep a table of squares under attack and update the table with every move,
  // this way not all pieces have to evaluated every move
  public getValidMoves(originIndex: number) {
    const bitValue = this.position[originIndex];
    const [color, piece] = getPieceFromBit(bitValue);

    const move: Move = {
      position: this.position,
      originIndex,
      color,
      piece,
    };

    if (piece === PieceType.Bishop || piece === PieceType.Queen || piece === PieceType.Rook)
      return generateStraightMoves(move);

    if (piece === PieceType.Pawn) return generatePawn(move);
    if (piece === PieceType.King) return generateKing(move);
    if (piece === PieceType.Knight) return generateKnight(move);
    return [];
  }

  public move({ origin, destination }: { origin: number; destination: number }) {
    this.position[destination] = this.position[origin];
    this.position[origin] = PieceType.None;
  }

  private applyPosition(positionFen: string): Array<number> {
    const squares = Array<number>(64).fill(0);

    let row = 0;
    let file = 0;
    // 8/p1p2b2/2Pp1K2/2Br4/1n6/1kp2p2/4n1p1/2R4B
    [...positionFen].forEach((symbol) => {
      if (symbol === "/") {
        file = 0;
        row++;
      } else {
        if (Chess.isNumber(symbol)) {
          file += Number(symbol);
        } else {
          const pieceColor = symbol === symbol.toUpperCase() ? PieceColor.Black : PieceColor.White;
          const pieceType = pieceTypeFromSymbol.find((x) => x.key === symbol.toLowerCase())!.value;

          squares[row * 8 + file] = Number(pieceColor) + Number(pieceType);
          file++;
        }
      }
    });

    this.position = squares;
    return this.position;
  }

  public getPosition(): Array<number> {
    return this.position.slice();
  }

  private static isNumber(character: string) {
    return character >= "0" && character <= "9";
  }
}
