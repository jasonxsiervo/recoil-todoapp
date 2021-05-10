import React from 'react';
import { useRecoilState } from 'recoil';
import { toDoListState } from "./recoil/atom/List";

export default function ToDoItem({ item }) {
    const [ toDoList, setToDoList ] = useRecoilState(toDoListState);
    const index = toDoList.findIndex((listItem) => listItem === item);

    const editItemText = ({target: {value}}) => {
        const newList = replaceItemAtIndex(toDoList, index, {
            ...item,
            text: value,
        })
        console.log('Edit Item: ', newList);
        setToDoList(newList);
    };

    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(toDoList, index, {
            ...item,
            isComplete: !item.isComplete,
        })
        console.log('toggle Item: ', newList);
        setToDoList(newList);
    };

    const deleteItem = () => {
        console.log('delete')
        const newList = removeItemAtIndex(toDoList, index);
        console.log('delete item: ', newList);
        console.log('DELETE - newList; ', newList);
        setToDoList(newList);
    };

    return (
        <div>
            <input type="text" value={item.text} onChange={editItemText} />
            <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
            <button onClick={deleteItem}>X</button>
        </div>
    );
}

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
  
function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}