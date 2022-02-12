import { checkIsWin, setStaticState, get2DArray } from '../util';
import { ROW, COLUMN, RESET, SELECT } from '../const';
export const initialState = {
  history: get2DArray(ROW, COLUMN, 0),
  user: 0,
  result: [],
  gameOver: false
};

export function reducer(state, action) {
  switch (action.type) {
    case SELECT:
      let { realXIndex, realYIndex, user } = action;
      state.history[realXIndex][realYIndex] = user;
      state.result = checkIsWin(state.history, realXIndex, realYIndex);
      state.gameOver = setStaticState(state.result).gameOver; // 每次都对游戏结果进行检查
      return state;
    case RESET:
      state = {
        history: get2DArray(ROW, COLUMN, 0),
        user: 0,
        result: [],
        gameOver: false
      };
      return state;
    default:
      throw new Error(`触发${action.type}时发生错误`);
  }
}
