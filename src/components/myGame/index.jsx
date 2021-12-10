import React, { useState, useEffect, useReducer } from 'react'
import Square from './components/square';
/**
 * 游戏初始数据
 */
const ROW = 15;
const COLUMN = 15;
const initialState = {
    value: new Array(ROW).fill(new Array(COLUMN).fill("")),
    currrentUser: 1,
    winner: 0,
    gameOver: false,
    result: [],
};
const direction = {
    horizontal: 1,
    vertical: 2,
    leftOblique: 3,
    rightOblique: 4
};


function setStaticState(result) {
    if (result && result.length === 5) {
        return {
            gameOver: true
        }
    } else {
        return {
            gameOver: false
        }
    }
}

function checkIsWin(arr, x, y) {
    let target = arr[x][y],
        rowLength = arr.length, // 棋盘高度
        colLength = arr[0].length, // 棋盘宽度
        startNode = { x, y },
        nodeList;
    /**
     * 
     * @param {*} node 
     * @returns 检测结点是否与检测目标值target相同
     */
    function check(node) {
        /**
         * 检测是否越界
         */
        if (node.x >= rowLength || node.x < 0 || node.y >= colLength || node.y < 0) {
            return false;
        }
        if (arr[node.x][node.y] === target) {
            return true;
        }
        return false;
    }

    for (let i = 1; i <= 4; i++) {
        nodeList = [startNode];
        let left = startNode,
            right = startNode,
            leftVal = true,
            rightVal = true;

        // 从当前节点出发，左右或者上下同时检测，如果值与目标检测节点值target相同则nodeList的长度加一
        while (leftVal || rightVal) {
            if (leftVal) {
                left = getCoordinate(i, left, -1);
                leftVal = check(left) && nodeList.push(left);
            }
            if (rightVal) {
                right = getCoordinate(i, right, 1);
                rightVal = check(right) && nodeList.push(right);
            }
            // nodeList的长度是五即取得胜利
            if (nodeList.length === 5) {
                return nodeList;
            }
        }
    }
    return nodeList;
};
/**
 * 
 * @param {*} direct  horizontal: 1, vertical: 2, leftOblique: 3, rightOblique: 4 水平方向，垂直方向，左下到右上，右下到左上，
 * @param {*} node 
 * @param {*} tag 1 向右 -1 向左
 * @returns 根据tag的值对node的坐标值进行处理后并返回新的坐标值
 */
function getCoordinate(direct, node, tag) {
    let newNode;
    let { horizontal, vertical, leftOblique, rightOblique } = direction;
    switch (direct) {
        case horizontal:
            newNode = {
                x: node.x,
                y: node.y + tag
            };
            break;
        case vertical:
            newNode = {
                x: node.x + tag,
                y: node.y
            };
            break;
        case leftOblique:
            newNode = {
                x: node.x + tag,
                y: node.y + tag
            };
            break;
        case rightOblique:
            newNode = {
                x: node.x - tag,
                y: node.y + tag
            };
            break;
        default:
            newNode = {
                x: -1,
                y: -1
            };
    }
    return newNode;
}

function reducer(state, action) {
    switch (action.type) {
        case 'selected':
            let { row, column } = action;

            // 禁止操作已经结束的棋局
            if (state.gameOver) {
                if (confirm(`游戏已结束，获胜者是${state.currrentUser === 1 ? "X" : "O"},是否重置游戏？`)) {
                    state = {
                        value: new Array(15).fill(new Array(15).fill("")),
                        currrentUser: 1,
                        winner: 0,
                        gameOver: false,
                        result: [],
                    };
                    return state;
                } else {
                    return state;
                }
            }
            // 避免给已经下过的棋子修改状态
            if (state.value[row][column] !== "") return state;

            let newColumn = [...state.value[row]];
            newColumn[column] = state.currrentUser === 1 ? "O" : "X"
            state.value[row] = [...newColumn]; //避免同时给一列元素同时赋值
            let result = checkIsWin(state.value, row, column);
            console.log('result', result);
            state.gameOver = setStaticState(result).gameOver; // 每次都对游戏结果进行检查

            state.currrentUser = state.currrentUser === 1 ? 2 : 1;
            return state;
        case 'reset':
            state = {
                value: new Array(15).fill(new Array(15).fill("")),
                currrentUser: 1,
                winner: 0,
                gameOver: false,
                result: [],
            };
            return state;
        default:
            throw new Error("myGame's state is error");
    }
}

export default function MyGame(props) {
    let [currrentUser, setcurrrentUser] = useState(1);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.gameOver && confirm(`游戏已结束，获胜者是${state.currrentUser === 1 ? "X" : "O"},是否重置游戏？`)) {
            dispatch({ type: "reset" })
        }
    }, [state.gameOver])

    return (
        <div style={{ width: "100%", height: "100%", paddingTop: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
            {/* 比赛结果展示及重置游戏操作 */}
            <div style={{ width: "600px", display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: "5px" }}>
                <div>{`${state.gameOver ? `获胜者是${state.currrentUser === 1 ? "X" : "O"}` : "棋局仍在进行中"}`}</div>
                <div>当前执棋者{state.currrentUser === 1 ? "O" : "X"}</div>
                <button onClick={() => dispatch({ type: "reset" })}>重置游戏</button>
            </div>
            <div>
                {/* 
                    棋盘和棋子
                */}
                {
                    state.value.map((_, rowIdx) => {
                        return (
                            <div key={Symbol(`row_${rowIdx}`).toString()} style={{ display: "flex" }}>
                                {
                                    state.value[rowIdx].map((_, colIdx) => {

                                        return (
                                            <Square key={Symbol(`index_${rowIdx}_${colIdx}`).toString()} {...{ value: state.value[rowIdx][colIdx] }} onClick={() => {
                                                setcurrrentUser(currrentUser === 1 ? 2 : 1)
                                                dispatch({ type: "selected", row: rowIdx, column: colIdx });
                                            }} />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}