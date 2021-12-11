import { RESET, SELECT } from './const';

function reset() {
    return {
        type: RESET
    };
};
function select(row, column) {
    return { type: SELECT, row, column };
}

export {
    reset,
    select
}