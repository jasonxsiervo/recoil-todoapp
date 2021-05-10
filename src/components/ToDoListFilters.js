import React from 'react';
import { useRecoilState } from 'recoil';
import { toDoListFilterState } from './recoil/atom/List';

function ToDoListFilters(props) {
    const [filter, setFilter] = useRecoilState(toDoListFilterState);

    const updateFilter = ({target: {value}}) => {
        setFilter(value);
    }
    return (
        <div>
            Filter:
            <select value={filter} onChange={updateFilter}>
                <option value="Show All">All</option>
                <option value="Show Completed">Completed</option>
                <option value="Show Uncompleted">Uncompleted</option>
            </select>
        </div>
    );
}

export default ToDoListFilters;