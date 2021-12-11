import React from 'react';
import Square from './square';
import { select } from '@/store/actionCreators';
export default function ChessBoard(props) {
    const { value, currrentUser, setCurrrentUser, dispatch } = props;
    /* 
        棋盘和棋子
    */
    return(
        <div>
        {
            value?.map((_, rowIdx) => {
                return (
                    <div key={ `row_${rowIdx}` } style={{ display: "flex" }}>
                        {
                            value[rowIdx]?.map((_, colIdx) => {

                                return (
                                    <Square key={ `square_${rowIdx}_${colIdx}` }
                                     {...{ value: value[rowIdx][colIdx] }} onClick={() => {
                                        setCurrrentUser(currrentUser === 1 ? 2 : 1)
                                        dispatch(select(rowIdx, colIdx));
                                    }} />
                                )
                            })
                        }
                    </div>
                )
            })
        }
    </div>
    )
}