import { ROW, COLUMN, RESET, SELECT } from './const';
import { checkIsWin, setStaticState } from './util';

const initialState = {
  value: new Array(ROW).fill(new Array(COLUMN).fill('')),
  currrentUser: 1,
  gameOver: false,
  result: []
};
function reducer(state, action) {
  switch (action.type) {
    case SELECT:
      let { row, column } = action;

      // 禁止操作已经结束的棋局
      if (state.gameOver) {
        if (confirm(`游戏已结束，获胜者是${state.currrentUser === 1 ? 'X' : 'O'},是否重置游戏？`)) {
          state = {
            value: new Array(15).fill(new Array(15).fill('')),
            currrentUser: 1,
            gameOver: false,
            result: []
          };
          return state;
        } else {
          return state;
        }
      }
      // 避免给已经下过的棋子修改状态
      if (state.value[row][column] !== '') return state;

      let newColumn = [...state.value[row]];
      newColumn[column] = state.currrentUser === 1 ? 'O' : 'X';
      state.value[row] = [...newColumn]; //避免同时给一列元素同时赋值
      state.result = checkIsWin(state.value, row, column);
      state.gameOver = setStaticState(state.result).gameOver; // 每次都对游戏结果进行检查
      state.currrentUser = state.currrentUser === 1 ? 2 : 1;
      return state;
    case RESET:
      state = {
        value: new Array(15).fill(new Array(15).fill('')),
        currrentUser: 1,
        gameOver: false,
        result: []
      };
      return state;
    default:
      throw new Error("myGame's state is error");
  }
}
export { initialState, reducer };
