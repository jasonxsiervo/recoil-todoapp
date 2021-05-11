// these keeps track of the two dependencies todoListFilterState and todoListState 
// so that it reruns if either of those changes

import { selector } from "recoil";
import { toDoListFilterState, toDoListState } from "../atom/List";

export const filteredToDoListState = selector({
    key: 'filteredToDoListState',
    get : ({get}) => {
        const filter = get(toDoListFilterState);
        const list = get(toDoListState);

        switch(filter) {
            case 'Show Completed':
                // I don't get it how filter is working
                // Ahhh! I get it! This works with ToDoListFilters.js
                return list.filter((item) => item.isComplete);
            case 'Show Uncompleted':
                return list.filter((item) => !item.isComplete);
            default:
                return list;
        }
    }
});