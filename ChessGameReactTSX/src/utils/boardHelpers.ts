import { HORIZONTAL_AXIS, VERTICAL_AXIS } from "../data/constants/constants";
import { Board, Position } from "../data/types/types";



export function idToBoardCoordinates(tileId: string) {
    const x = HORIZONTAL_AXIS.indexOf(tileId[0]);
    const y = VERTICAL_AXIS.length - parseInt(tileId[1]);

    return [y, x];
}



export function isAttackMove(board: Board, tileId: string) {
    const coordinates = idToBoardCoordinates(tileId);

    if (board[coordinates[0]][coordinates[1]] !== null) {
      return true;
    } else {
      return false;
    }
}

export function draggedPosToBoardCoord(x: number, y: number, chessboard: HTMLDivElement) {

  const tileLength = chessboard.clientWidth / 8;
  const tileHeight = chessboard.clientHeight / 8;

  const tileX = Math.floor(x / tileLength);
  const tileY = Math.floor(y / tileHeight);

  return ({tileY, tileX})
}

export function boardCoordinatesToTileId(x: number, y: number) {

  const tileX = HORIZONTAL_AXIS[x];
  const tileY = VERTICAL_AXIS.length - y;
  
  return (tileX + tileY)
}

export function tileIdToBoardCoordinates(tileId: Position) {
  const tileX = HORIZONTAL_AXIS.indexOf(tileId[0]);
  const tileY = VERTICAL_AXIS.length - parseInt(tileId[1]);

  return ({tileY, tileX})
}