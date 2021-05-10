// import { fontSizeState, fontSizeLabelState } from './recoil/FontSize';
import { toDoListState } from './recoil/List';
import { useRecoilState } from 'recoil';
import ToDoItem from './ToDoItem';
import ToDoItemCreator from './ToDoItemCreator';
import { useEffect } from 'react';

function ToDoList() {

    // const [ fontSize, setFontSize ] = useRecoilState(fontSizeState);
    // const fontSizeLabel = useRecoilValue(fontSizeLabelState);

    // const handleOnClick = useCallback(() => {
    //     setFontSize(fontSize => fontSize + 1);

    // }, [fontSize, setFontSize]);

    const toDoList = useRecoilState(toDoListState);
    
    useEffect(() => {
        console.log('toDoList; ', toDoList[0])
    }, [toDoList])


    return (
        <div>
            {/* <h1 style={{fontSize}}>To Do List component</h1>
            <p>Current font size is {fontSizeLabel}</p>

            <button onClick={handleOnClick}>
                Increase Font Size
            </button> */}

            <ToDoItemCreator />

            {
             toDoList[0].map((item) => (
                <ToDoItem key={item.id} item={item} />
            ))
             }
        </div>
    );
}

export default ToDoList;