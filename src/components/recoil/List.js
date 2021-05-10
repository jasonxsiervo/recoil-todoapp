import { atom } from "recoil";

export const toDoListState = atom({
    key: 'toDoListState',
    default: [],
});