import React from 'react';
import { useRecoilValue } from 'recoil';
import { toDoListStatsState } from './recoil/selectors/toDoListStatsState';

function ToDoListStats(props) {
    const {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted
    } = useRecoilValue(toDoListStatsState);

    const formattedPercentCompleted = Math.round(percentCompleted);
    return (
        <ul>
            <li>Total items: {totalNum}</li>
            <li>Items completed: {totalCompletedNum}</li>
            <li>Items not completed: {totalUncompletedNum}</li>
            <li>Percent completed: {formattedPercentCompleted}</li>
        </ul>
    );
}

export default ToDoListStats;