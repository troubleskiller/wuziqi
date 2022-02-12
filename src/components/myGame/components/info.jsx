import React from 'react';
import './info.scss';

export default function Info(props) {
  const { gameOver, currrentUser, handleResetButton } = props;

  return (
    <div className={'info'}>
      <div>{`${gameOver ? `获胜者是${currrentUser === 1 ? 'X' : 'O'}` : '棋局仍在进行中'}`}</div>
      <div>当前执棋者&nbsp;{currrentUser === 1 ? 'O' : 'X'}</div>
      <button name="resetButton" onClick={handleResetButton}>
        重置游戏
      </button>
    </div>
  );
}
