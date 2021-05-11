import { useCallback, useState } from "react"
import { useSetRecoilState } from "recoil";
import { toDoListState } from "./recoil/atom/List";

export default function ToDoItemCreator() {
    const [ inputValue, setInputValue ] = useState('');
    const setToDoList = useSetRecoilState(toDoListState);

    const addItem = useCallback(() => {
        setToDoList((oldToDoList) => [
            ...oldToDoList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            }
        ]);
        setInputValue('');
    }, [inputValue, setToDoList]);

    const handleOnChange = ({target: {value}}) => {
        // console.log(e.target.value);
        setInputValue(value);
    };

    return (
        <>
            <input type="text" value={inputValue} onChange={handleOnChange} />
            <button onClick={addItem}>Save</button>
        </>
    )
}

let id = 0;
function getId() {
    return id++;
}