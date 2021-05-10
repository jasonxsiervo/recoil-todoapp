import { atom } from "recoil";

export const toDoListState = atom({
    key: 'toDoListState',
    default: [],
});

export const toDoListFilterState = atom({
    key: 'toDoListFilterState',
    default: 'Show All',
});