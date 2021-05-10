import { selector } from "recoil";
import { toDoListFilterState, toDoListState } from "../atom/List";

export const filteredToDoListState = selector({
    key: 'filteredToDoListState',
    get : ({get}) => {
        const filter = get(toDoListFilterState);
        const list = get(toDoListState);

        switch(filter) {
            case 'Show Completed':
                return list.filter((item) => item.isComplete);
            case 'Show Uncompleted':
                return list.filter((item) => !item.isComplete);
            default:
                return list;
        }
    }
})