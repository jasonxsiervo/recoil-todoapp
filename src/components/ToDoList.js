import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fontSizeState, fontSizeLabelState } from './recoil/atom/FontSize';
import { currentUserIDState, userList, userListQuery } from './recoil/atom/User';
import { filteredToDoListState } from './recoil/selectors/FilteredToDo';
import ToDoListFilters from './ToDoListFilters';
import ToDoListStats from './ToDoListStats';
import ToDoItem from './ToDoItem';
import ToDoItemCreator from './ToDoItemCreator';
import axios from 'axios';
import User from './User';

const ToDoListContainer = styled.div`
    background: yellow;
`;

const FontSizeContainer = styled.div`
    background: blue;
`;

const UserListContainer = styled.div`
    background: red;
`;


function ToDoList() {

    const [ fontSize, setFontSize ] = useRecoilState(fontSizeState);
    const fontSizeLabel = useRecoilValue(fontSizeLabelState);

    const handleOnClick = useCallback(() => {
        setFontSize(fontSize => fontSize + 1);
    }, [setFontSize]);

    const toDoList = useRecoilState(filteredToDoListState);

    const users = useRecoilValue(userList);
    const setListOfUsers = useSetRecoilState(userList);
    const setCurrentUserID = useSetRecoilState(currentUserIDState);
    const currentUser = useRecoilValue(userListQuery);

    useEffect(() => {
        async function fetchData() {
            const response = await axios
                .get('http://jsonplaceholder.typicode.com/users');
            setListOfUsers(() => [
                ...response.data,
            ]);
        }
        fetchData();
    }, [setListOfUsers]);

    return (
        <>
            <ToDoListContainer>
                <h1>To-do List</h1>

                <ToDoItemCreator />
                <ToDoListFilters />
                <ToDoListStats />

                {
                    toDoList[0].map((item) => (
                        <ToDoItem key={item.id} item={item} />
                    ))
                }
            </ToDoListContainer>

            <FontSizeContainer>
                <FontSize 
                    fontSize={fontSize} 
                    fontSizeLabel={fontSizeLabel} 
                    handleOnClick={handleOnClick} 
                />
            </FontSizeContainer>

            <UserListContainer>
                <h1>Welcome, {currentUser}</h1>
                {
                    users.length !== 0 ?
                    users.map((user) => (
                        <User 
                            key={user.id} 
                            userInfo={user} 
                            handleUserClick={() => setCurrentUserID(user.id)}
                        />
                    ))
                    :
                    <p>Loading...</p>
                }
            </UserListContainer>
            
        </>
    );
}

const FontSize = ({ fontSize, fontSizeLabel, handleOnClick }) => {
    return (
        <>
            <h1 style={{fontSize}}>To Do List component</h1>
            <p>Current i size is {fontSizeLabel}</p>

            <button onClick={handleOnClick}>
                Increase Font Size
            </button> 
        </>
    )
};


export default ToDoList;