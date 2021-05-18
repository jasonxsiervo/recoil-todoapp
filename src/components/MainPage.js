import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import { Grid, View, Button } from '@adobe/react-spectrum';
import { 
    useRecoilState, 
    useRecoilValue, 
    useRecoilValueLoadable, 
    useResetRecoilState, 
    useSetRecoilState,
    useRecoilCallback,
} from 'recoil';
import styled from 'styled-components';
import { fontSizeState, fontSizeLabelState } from './recoil/atom/FontSize';
import { currentUserIDState, userList, userListQuery } from './recoil/atom/User';
import { Fahrenheit, getCelsius } from './recoil/atom/Temperature';
import { filteredToDoListState } from './recoil/selectors/FilteredToDo';
import ToDoListFilters from './ToDoListFilters';
import ToDoListStats from './ToDoListStats';
import ToDoItem from './ToDoItem';
import ToDoItemCreator from './ToDoItemCreator';
import User from './User';


const ToDoListContainer = styled.div`
    background: transparent;
`;

const FontSizeContainer = styled.div`
    background: transparent;
`;

const UserListContainer = styled.div`
    background: transparent;
`;


function ToDoList() {

    const [ fontSize, setFontSize ] = useRecoilState(fontSizeState);
    const fontSizeLabel = useRecoilValue(fontSizeLabelState);

    const handleOnClick = useCallback(() => {
        setFontSize(fontSize => {
            if(fontSize > 38) {
                return 20
            } else {
                return fontSize + 1
            }
        });
    }, [setFontSize]);

    const resetSize = useCallback(() => {
        setFontSize(20);
    }, [setFontSize]);

    const toDoList = useRecoilState(filteredToDoListState);

    const usersLoadable = useRecoilValueLoadable(userList);
    const setCurrentUserID = useSetRecoilState(currentUserIDState);
    const setListOfUsers = useSetRecoilState(userList);
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

    const reloadList = useRecoilCallback(({snapshot}) => async () => {
        return await snapshot.getPromise(userList);
    })

    const [ fahrenheit, setFahrenheit ] = useRecoilState(Fahrenheit);
    const [ celsius, setCelsius ] = useRecoilState(getCelsius);
    const resetValues = useResetRecoilState(Fahrenheit);

    const addTenF = () => {
        console.log('addTenF')
        setFahrenheit(fahrenheit + 10);
    }

    const addTenC = () => {
        console.log('addTenC')
        setCelsius(celsius + 10);
    }


    return (
        <Grid
            // areas={['header  header', 'sidebar content', 'footer  footer']}
            areas={['header  header header', 'left-sidebar content right-sidebar']}
            columns={['1fr', '3fr', '1fr']}
            rows={['size-1000', 'auto']}
            height={["size-6000"]}
            gap="size-100"
        >
            
            <View backgroundColor="gray-200" gridArea="header">
                <FontSize 
                    fontSize={fontSize} 
                    fontSizeLabel={fontSizeLabel} 
                    handleOnClick={handleOnClick} 
                    resetSize={resetSize}
                />    
            </View>

            <View backgroundColor="gray-200" gridArea="left-sidebar">
                <Grid
                    columns={['1fr']}
                    rows={['1fr', '1fr']}
                    gap="size-100"
                    margin="size-100"
                >
                    <Button variant="secondary" isQuiet>
                        To Do List
                    </Button>
                    <Button variant="secondary" isQuiet>
                        Users
                    </Button>
                    <Button variant="secondary" isQuiet>
                        Fahrenheit/Celsius
                    </Button>
                </Grid>
            </View>

            <View backgroundColor="gray-200" gridArea="content">
                {/* <h1>To-do List</h1>

                <ToDoItemCreator />
                <ToDoListFilters />
                <ToDoListStats />

                {
                    toDoList[0].map((item) => (
                    <ToDoItem key={item.id} item={item} />
                    ))
                } */}

                {/* <h1>Temperature</h1>

                <h2>{fahrenheit}°F is {celsius}°C</h2>

                <Button variant="secondary" onPress={addTenC}>
                    Add 10°C
                </Button>
                <Button variant="secondary" onPress={addTenF}>
                    Add 10°F
                </Button>
                <Button variant="secondary" onPress={resetValues}>
                    Reset
                </Button> */}

            { currentUser.length > 0 ? <h1>Welcome, {currentUser}</h1> : <h1>Welcome!</h1> }
                <Button variant="secondary" onPress={reloadList}>
                    🔃
                </Button>
                
                <UsersInfo usersLoadable={usersLoadable} setCurrentUserID={setCurrentUserID}/>
            </View>


            <View backgroundColor="gray-200" gridArea="right-sidebar">
                <Grid
                    columns={['1fr']}
                    rows={['1fr', '1fr']}
                    gap="size-100"
                    margin="size-100"
                >
                    <Button variant="secondary" isQuiet>
                        To Do List
                    </Button>
                    <Button variant="secondary" isQuiet>
                        Users
                    </Button>
                    <Button variant="secondary" isQuiet>
                        Fahrenheit/Celsius
                    </Button>
                </Grid>
            </View>
        </Grid>
        // <>
        //     <ToDoListContainer>
        //         <h1>To-do List</h1>

        //         <ToDoItemCreator />
        //         <ToDoListFilters />
        //         <ToDoListStats />

        //         {
        //             toDoList[0].map((item) => (
        //                 <ToDoItem key={item.id} item={item} />
        //             ))
        //         }
        //     </ToDoListContainer>

        //     <FontSizeContainer>
        //         <FontSize 
        //             fontSize={fontSize} 
        //             fontSizeLabel={fontSizeLabel} 
        //             handleOnClick={handleOnClick} 
        //             resetSize={resetSize}
        //         />
        //     </FontSizeContainer>

        //     <UserListContainer>
        //         <h1>{currentUser.length > 0 ? <h1>Welcome, {currentUser}</h1> : <h1>Welcome!</h1>}</h1>
        //         {
        //             users.length !== 0 ?
        //             users.map((user) => (
        //                 <User 
        //                     key={user.id} 
        //                     userInfo={user} 
        //                     handleUserClick={() => setCurrentUserID(user.id)}
        //                 />
        //             ))
        //             :
        //             <p>Loading...</p>
        //         }
        //     </UserListContainer>
            
        // </>
    );
}

const FontSize = ({ fontSize, fontSizeLabel, handleOnClick, resetSize }) => {
    return (
        <FontSizeContainer>
            <h1 style={{fontSize, cursor: 'pointer', margin: 0}} onClick={handleOnClick}>To Do List component</h1>
            <p style={{ margin: 0}} onClick={resetSize}>({fontSizeLabel})</p>

            {/* <button onClick={handleOnClick}>
                Increase Font Size
            </button>  */}
        </FontSizeContainer>
    )
};

function UsersInfo({ usersLoadable, setCurrentUserID }) {
    switch (usersLoadable.state) {
        case 'hasValue':
            return usersLoadable.contents.map((user) => (
                <User 
                    key={user.id} 
                    userInfo={user} 
                    handleUserClick={() => setCurrentUserID(user.id)}
                />
            ))
        case 'loading':
            return <h1>Loading...</h1>
        case 'hasError':
            throw usersLoadable.contents;
    }
}


export default ToDoList;