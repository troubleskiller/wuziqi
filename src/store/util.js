
/**
 * 游戏初始数据
 */
import { DIRECTION } from "./const";
export function setStaticState(result) {
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

export function checkIsWin(arr, x, y) {
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
export function getCoordinate(direct, node, tag) {
    let newNode;
    let {
        HORIZONTAL,
        VERTICAL,
        LEFT_OBLIQUE,
        RIGHT_OBLIQUE } = DIRECTION;
    switch (direct) {
        case HORIZONTAL:
            newNode = {
                x: node.x,
                y: node.y + tag
            };
            break;
        case VERTICAL:
            newNode = {
                x: node.x + tag,
                y: node.y
            };
            break;
        case LEFT_OBLIQUE:
            newNode = {
                x: node.x + tag,
                y: node.y + tag
            };
            break;
        case RIGHT_OBLIQUE:
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