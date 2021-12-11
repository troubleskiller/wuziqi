import React, { useRef, useEffect, useState, useReducer } from 'react'
import { getRealCoordinate, getCircle } from "./util";
import { RESET, SELECT, BASE_WIDTH, BASE_HEIGHT, CIRCLE, RADIUS, COLUMN, ROW } from './const';

import { reducer, initialState } from './store/reduce';


export default function NewGame(props) {

    const { width = 800, height = 800 } = props;
    const { playWidth = 880, playHeight = 880 } = props;

    let [isBlack, setIsBlack] = useState(true);
    const [state, dispatch] = useReducer(reducer, initialState)

    let canvasRef = useRef(null);
    let chessRef = useRef(null);
    let routeToWinRef = useRef(null);

    const { history, result, gameOver } = state;

    function init() { // 绘制棋盘
        let canvas = canvasRef.current;
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#999"
        for (let x = 0; x <= COLUMN; x++) {
            ctx.moveTo(x * BASE_WIDTH, 0);
            ctx.lineTo(x * BASE_WIDTH, height);
            ctx.stroke();
        }
        for (let y = 0; y <= ROW; y++) {
            ctx.moveTo(0, y * BASE_HEIGHT);
            ctx.lineTo(width, y * BASE_HEIGHT);
            ctx.stroke();
        }
        var [realX, realY] = getRealCoordinate(400, 400)
        ctx.moveTo(realX, realY);
        ctx.arc(realX, realY, 5, 0, CIRCLE);

        var [realX, realY] = getRealCoordinate(240, 240)
        ctx.moveTo(realX, realY);
        ctx.arc(realX, realY, 5, 0, CIRCLE);

        var [realX, realY] = getRealCoordinate(240, 560)
        ctx.moveTo(realX, realY);
        ctx.arc(realX, realY, 5, 0, CIRCLE);

        var [realX, realY] = getRealCoordinate(560, 560)
        ctx.moveTo(realX, realY);
        ctx.arc(realX, realY, 5, 0, CIRCLE);

        var [realX, realY] = getRealCoordinate(560, 240)
        ctx.moveTo(realX, realY);
        ctx.arc(realX, realY, 5, 0, CIRCLE);

        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function select(e) {// 落子
        if (gameOver === true) {
            if (gameOver && confirm(`游戏已结束，获胜者是${user === 1 ? "X" : "O"},是否重置游戏？`)) {
                chessRef.current.getContext('2d').clearRect(0, 0, playWidth, playWidth);
                dispatch({ type: RESET });
                setIsBlack(true);
            }
            return;
        }
        const [realX, realY, realXIndex, realYIndex] = getRealCoordinate(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        if (realXIndex >= 0 && realYIndex >= 0 && realXIndex <= 20 && realYIndex <= 20 && history[realXIndex][realYIndex] === 0) {
            const ctx = chessRef.current.getContext('2d');
            const gradient = ctx.createRadialGradient(realX, realY, RADIUS, realX - 5, realY - 5, 0);
            if (isBlack) {
                gradient.addColorStop(0, '#0a0a0a');
                gradient.addColorStop(1, '#636766');
            } else {
                gradient.addColorStop(0, '#d1d1d1');
                gradient.addColorStop(1, '#f9f9f9');
            }
            getCircle(ctx, realX, realY, RADIUS, gradient);

            ctx.closePath();
            setIsBlack(!isBlack);
            dispatch({ type: SELECT, realXIndex, realYIndex, user: isBlack ? 1 : 2 })
        };
    }

    function reset() { // 重置游戏
            chessRef.current.getContext('2d').clearRect(0, 0, playWidth, playHeight);
            dispatch({ type: RESET });
            setIsBlack(true);
    }
    function finishReset() {
        // 有一方获胜时选择重置游戏
        if (confirm(`游戏已结束，获胜者是${state.user === 1 ? "白棋" : "黑棋"},是否重置游戏？`)) {
            reset()
        }
    }
    useEffect(() => {
        init(); //初始化绘制棋盘
    }, []);

    useEffect(() => {
        if (gameOver) {
            /**  计算获胜路线的起点和终点 start           */
            let start = result.sort((a, b) => a.x - b.x)[0];
            let end = result.sort((a, b) => a.x - b.x)[4];

            let startX = (start.x + 1) * BASE_WIDTH;
            let endX = (end.x + 1) * BASE_WIDTH;

            let startY = (start.y + 1) * BASE_HEIGHT;
            let endY = (end.y + 1) * BASE_HEIGHT;
            /**  计算获胜路线的起点和终点 end           */

            /** 绘制获胜路线 start */
            const ctx = routeToWinRef.current.getContext('2d');

            ctx.strokeStyle = "#DB7D74";
            ctx.lineWidth = 5;
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            /** 绘制获胜路线 end */

            setTimeout(finishReset, 500);
        }
    }, [gameOver === true]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <div>
                <div style={{
                    position: "relative",
                    cursor: "pointer",
                }}>

                    {/* 第一个canvas当作棋盘背景使用 */}
                    <canvas ref={canvasRef} width={width} height={height}
                        style={{
                            border: "1px solid #999",
                            zIndex: "-1",
                            position: "absolute",
                            margin: "40px"
                        }}
                    >
                    </canvas>
                    {/* 第二个canvas用来绘制棋子 */}
                    <canvas ref={chessRef} width={playWidth} height={playHeight}
                        style={{
                            zIndex: "1000",
                            border: "1px solid red",
                        }}
                        onClick={select}
                    >
                    </canvas>
                    {/* 第三个canvas用来绘制获胜的路径 */}
                    {
                        gameOver && <canvas ref={routeToWinRef} width={playWidth}
                            height={playHeight}
                            style={{
                                zIndex: "1",
                                position: "absolute",
                                left: 0,
                                top: 0
                            }}
                            onClick={finishReset}
                        ></canvas>
                    }
                </div>
            </div>
            <div style={{
                position: "absolute",
                right: "200px",
                width: "200px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "flex-start",
                border: "1px solid black",
                padding: "20px"
            }}>
                <div>
                    {
                        gameOver ? `游戏已结束，获胜者是${isBlack ? "白棋" : "黑棋"}` : "棋局仍在进行中"
                    }
                </div>
                <div>当前执棋者&nbsp;{isBlack ? "黑棋" : "白棋"}</div>
                <button onClick={reset}>重置游戏</button>
            </div>
        </div>
    )
}