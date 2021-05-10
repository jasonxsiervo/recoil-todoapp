import { selector } from "recoil";
import { toDoListState } from "../atom/List";

export const toDoListStatsState = selector({
    key: 'toDoListStatsState',
    get: ({get}) => {
        const toDoList = get(toDoListState);
        const totalNum = toDoList.length;
        const totalCompletedNum = toDoList.filter((item) => item.isComplete).length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;

        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted
        }
    }
})