import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import { Grid, View, Button, SearchField } from '@adobe/react-spectrum';
import { 
    useRecoilState, 
    useRecoilValue, 
    useRecoilValueLoadable, 
    useResetRecoilState, 
    useSetRecoilState,
    useRecoilCallback,
} from 'recoil';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { fontSizeState, fontSizeLabelState } from './recoil/atom/FontSize';
import { currentUserIDState, userList, userListQuery } from './recoil/atom/User';
import { Fahrenheit, getCelsius } from './recoil/atom/Temperature';
import { filteredToDoListState } from './recoil/selectors/FilteredToDo';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Post from './containers/Post';
import Profile from './containers/Profile';
import ToDoListFilters from './ToDoListFilters';
import ToDoListStats from './ToDoListStats';
import ToDoItem from './ToDoItem';
import ToDoItemCreator from './ToDoItemCreator';
import User from './User';



function MainPage() {

    const is3Cols = useMediaQuery({ minWidth: 1300 });
    const is2Cols = useMediaQuery({ minWidth: 1265 });
    const is1Cols = useMediaQuery({ minWidth: 800 });

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
    };

    const addTenC = () => {
        console.log('addTenC')
        setCelsius(celsius + 10);
    };

    return (
        <View>
        {
            is3Cols ? 
                <Grid
                    areas={['left-sidebar header right-sidebar', 'left-sidebar content right-sidebar']}
                    columns={['2fr', 'minmax(600px, 5fr)', '2fr']}
                    rows={['size-1000', 'auto']}
                    height={["size-6000"]}
                    gap="size-100"
                    marginX="size-2000"
                >
                    
                    <View gridArea="header">
                        <Grid
                            areas={['SearchBar']}
                            columns={['1fr']}
                            justifyItems="center"
                        >
                            <View marginY="size-300" gridArea="SearchBar">
                                <SearchField
                                    placeholder="Enter text"
                                    width="size-6000"
                                    style={{backgroundColor: '#4B4B4B' }}
                                    // height="size-1000"
                                />
                            </View>
                        </Grid>
                    </View>

                    <View gridArea="left-sidebar">
                        <Grid
                            areas={['Logo', 'Title', 'Status', 'Content']}
                            columns={['1fr']}
                            rows={['size-600', 'size-400', 'size-200', 'size-1000']}
                            marginY="size-225"
                        >
                            <View gridArea="Logo">
                                just some text
                            </View>

                            <View justifySelf="start" alignSelf="end" gridArea="Title">
                                <p style={{marginBottom: '-30px', fontSize: 22}}><b>People</b></p>
                            </View>

                            <View gridArea="Status">
                                <p style={{marginTop: '35px'}}>Online</p>
                            </View>

                            <View marginTop="size-400" gridArea="Content">
                                <UsersInfo usersLoadable={usersLoadable} setCurrentUserID={setCurrentUserID}/>
                            </View>
                        </Grid>
                    </View>

                    <View gridArea="content">
                        <Grid
                            areas={['PageName ActionButton', 'Content Content']}
                            columns={['5fr', 'size-1600']}
                            rows={['size-400', 'auto']}
                            rowGap="size-400"
                            marginX="size-500"
                        >
                            <View justifySelf="start" alignSelf="end" gridArea="PageName">
                                <p style={{marginBottom: '-5px', fontSize: 22}}><b>Your Feed</b></p>
                            </View>

                            <View justifySelf="end" alignSelf="end" gridArea="ActionButton">
                                <Button variant="cta">
                                    New room
                                </Button>
                            </View>

                            <View gridArea="Content">
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                            </View>
                        </Grid>
                    </View>


                    <View gridArea="right-sidebar">
                        <Grid
                            areas={['UserDP', 'Profile', 'ContentInfo']}
                            columns={['1fr']}
                            rows={['size-600', '2fr', '1fr']}
                            rowGap="size-300"
                            marginY="size-225"
                        >
                            <View gridArea="UserDP">

                            </View>
                            <View gridArea="Profile">
                                <Profile />
                            </View>

                            <View gridArea="ContentInfo">
                                <p>Content Info</p>
                            </View>

                        </Grid>
                    </View>
                </Grid>
            :
            is2Cols ?
            <Grid
                areas={['left-sidebar header right-sidebar', 'left-sidebar content right-sidebar']}
                columns={['2fr', 'minmax(600px, 5fr)', '2fr']}
                rows={['size-1000', 'auto']}
                height={["size-6000"]}
                gap="size-100"
                marginX="size-2000"
            >
                
                <View gridArea="header">
                    <Grid
                        areas={['SearchBar']}
                        columns={['1fr']}
                        justifyItems="center"
                    >
                        <View marginY="size-300" gridArea="SearchBar">
                            <SearchField
                                placeholder="Enter text"
                                width="size-6000"
                                style={{backgroundColor: '#4B4B4B' }}
                                // height="size-1000"
                            />
                        </View>
                    </Grid>
                </View>

                <View gridArea="left-sidebar">
                    <Grid
                        areas={['Logo', 'Title', 'Status', 'Content']}
                        columns={['1fr']}
                        rows={['size-600', 'size-400', 'size-200', 'size-1000']}
                        marginY="size-225"
                    >
                        <View gridArea="Logo">
                            just some text
                        </View>

                        <View justifySelf="start" alignSelf="end" gridArea="Title">
                            <p style={{marginBottom: '-30px', fontSize: 22}}><b>People</b></p>
                        </View>

                        <View gridArea="Status">
                            <p style={{marginTop: '35px'}}>Online</p>
                        </View>

                        <View marginTop="size-400" gridArea="Content">
                            <UsersInfo usersLoadable={usersLoadable} setCurrentUserID={setCurrentUserID}/>
                        </View>
                    </Grid>
                </View>

                <View gridArea="content">
                    <Grid
                        areas={['PageName ActionButton', 'Content Content']}
                        columns={['5fr', 'size-1600']}
                        rows={['size-400', 'auto']}
                        rowGap="size-400"
                        marginX="size-500"
                    >
                        <View justifySelf="start" alignSelf="end" gridArea="PageName">
                            <p style={{marginBottom: '-5px', fontSize: 22}}><b>Your Feed</b></p>
                        </View>

                        <View justifySelf="end" alignSelf="end" gridArea="ActionButton">
                            <Button variant="cta">
                                New room
                            </Button>
                        </View>

                        <View gridArea="Content">
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </View>
                    </Grid>
                </View>


                <View gridArea="right-sidebar">
                    <Grid
                        areas={['UserDP', 'Profile', 'ContentInfo']}
                        columns={['1fr']}
                        rows={['size-600', '2fr', '1fr']}
                        rowGap="size-300"
                        marginY="size-225"
                    >
                        <View gridArea="UserDP">

                        </View>
                        <View gridArea="Profile">
                            <Profile />
                        </View>

                        <View gridArea="ContentInfo">
                            <p>Content Info</p>
                        </View>

                    </Grid>
                </View>
            </Grid>
            : 
            is1Cols ?
            <Grid
                areas={['left-sidebar header', 'left-sidebar content']}
                columns={['2fr', 'minmax(600px, 5fr)']}
                rows={['size-1000', 'auto']}
                height={["size-6000"]}
                gap="size-100"
                marginX="size-2000"
            >
                
                <View gridArea="header">
                    <Grid
                        areas={['SearchBar']}
                        columns={['1fr']}
                        justifyItems="center"
                    >
                        <View marginY="size-300" gridArea="SearchBar">
                            <SearchField
                                placeholder="Enter text"
                                width="size-6000"
                                style={{backgroundColor: '#4B4B4B' }}
                                // height="size-1000"
                            />
                        </View>
                    </Grid>
                </View>

                <View gridArea="left-sidebar">
                    <Grid
                        areas={['Logo', 'Title', 'Status', 'Content']}
                        columns={['1fr']}
                        rows={['size-600', 'size-400', 'size-200', 'size-1000']}
                        marginY="size-225"
                    >
                        <View gridArea="Logo">
                            just some text
                        </View>

                        <View justifySelf="start" alignSelf="end" gridArea="Title">
                            <p style={{marginBottom: '-30px', fontSize: 22}}><b>People</b></p>
                        </View>

                        <View gridArea="Status">
                            <p style={{marginTop: '35px'}}>Online</p>
                        </View>

                        <View marginTop="size-400" gridArea="Content">
                            <UsersInfo usersLoadable={usersLoadable} setCurrentUserID={setCurrentUserID}/>
                        </View>
                    </Grid>
                </View>

                <View gridArea="content">
                    <Grid
                        areas={['PageName ActionButton', 'Content Content']}
                        columns={['5fr', 'size-1600']}
                        rows={['size-400', 'auto']}
                        rowGap="size-400"
                        marginX="size-500"
                    >
                        <View justifySelf="start" alignSelf="end" gridArea="PageName">
                            <p style={{marginBottom: '-5px', fontSize: 22}}><b>Your Feed</b></p>
                        </View>

                        <View justifySelf="end" alignSelf="end" gridArea="ActionButton">
                            <Button variant="cta">
                                New room
                            </Button>
                        </View>

                        <View gridArea="Content">
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </View>
                    </Grid>
                </View>
            </Grid>
            :
            <Grid
                areas={['header', 'content']}
                columns={['1fr']}
                rows={['size-1000', 'auto']}
                height={["size-6000"]}
                gap="size-100"
                marginX="size-200"
            >
                
                <View gridArea="header">
                    <Grid
                        areas={['SearchBar']}
                        columns={['1fr']}
                        justifyItems="center"
                    >
                        <View marginY="size-300" gridArea="SearchBar">
                            <SearchField
                                placeholder="Enter text"
                                // width='minmax(size-6000, 1fr)'
                                width="size-5000"
                                style={{backgroundColor: '#4B4B4B' }}
                                // height="size-1000"
                            />
                        </View>
                    </Grid>
                </View>

                <View gridArea="content">
                    <Grid
                        areas={['PageName ActionButton', 'Content Content']}
                        columns={['5fr', 'size-1600']}
                        rows={['size-400', 'auto']}
                        rowGap="size-400"
                        marginX="size-500"
                    >
                        <View justifySelf="start" alignSelf="end" gridArea="PageName">
                            <p style={{marginBottom: '-5px', fontSize: 22}}><b>Your Feed</b></p>
                        </View>

                        <View justifySelf="end" alignSelf="end" gridArea="ActionButton">
                            <Button variant="cta">
                                New room
                            </Button>
                        </View>

                        <View gridArea="Content">
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </View>
                    </Grid>
                </View>
            </Grid>
        }
        </View>
    );
}

const FontSize = ({ fontSize, fontSizeLabel, handleOnClick, resetSize }) => {
    return (
        <>
            <h1 style={{fontSize, cursor: 'pointer', margin: 0}} onClick={handleOnClick}>To Do List component</h1>
            <p style={{ margin: 0}} onClick={resetSize}>({fontSizeLabel})</p>

            {/* <button onClick={handleOnClick}>
                Increase Font Size
            </button>  */}
        </>
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
};


export default MainPage;