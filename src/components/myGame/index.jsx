import React, { useState, useEffect, useReducer } from 'react';
import { reset } from '@/store/actionCreators';
import { reducer, initialState } from '@/store';

import Info from './components/info';
import ChessBoard from './components/chessBoard';
import './index.scss';
export default function MyGame(props) {
  let [currrentUser, setCurrrentUser] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  let handleResetButton = () => {
    dispatch(reset());
  };
  useEffect(() => {
    if (state.gameOver && confirm(`游戏已结束，获胜者是${state.currrentUser === 1 ? 'X' : 'O'},是否重置游戏？`)) {
      dispatch(reset());
    }
  }, [state.gameOver]);

  return (
    <div className={'my-game'}>
      {/* 比赛结果展示及重置游戏操作 */}
      <Info {...{ gameOver: state.gameOver, currrentUser: state.currrentUser, handleResetButton }} />
      <ChessBoard {...{ value: state.value, currrentUser, setCurrrentUser, dispatch }} />
    </div>
  );
}
