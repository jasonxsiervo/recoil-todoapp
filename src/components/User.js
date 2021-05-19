import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import {Provider, defaultTheme, Button, Grid, View } from '@adobe/react-spectrum';
import { useButton } from '@react-aria/button';

const Border = styled.div`
    border-style: solid;
    margin: 10px;
    border-radius: 70px;
`;

function User({userInfo: { id, name, username, phone}, handleUserClick }) {

    const is3Cols = useMediaQuery({ minWidth: 1300 });
    const is2Cols = useMediaQuery({ minWidth: 1339 });
    const is1Cols = useMediaQuery({ minWidth: 800 });

    const handleClick = () => {
        handleUserClick(id);
    }
    const ref = React.useRef();
    const { buttonProps } = useButton(ref);

    return (
        <>
        {is3Cols ?
            <Grid
                areas={['ProfileDP UserHandleName']}
                columns={["2fr 5fr"]}
                rows={['auto']}
                marginY="size-200"
            >
                <View gridArea="ProfileDP">
                    pic.jpg
                </View>

                <View gridArea="UserHandleName">
                    <p><b>{username}</b></p>
                    <p style={{marginTop: -15}}>{name}</p>
                </View>
            </Grid>
        : is2Cols ? 
            <Grid
                areas={['ProfileDP']}
                columns={["1fr"]}
                rows={['auto']}
                marginY="size-200"
            >
                <View gridArea="ProfileDP">
                    pic.jpg
                </View>
            </Grid>
        : is1Cols ?
            <Grid
                areas={['ProfileDP']}
                columns={["1fr"]}
                rows={['auto']}
                marginY="size-200"
            >
                <View gridArea="ProfileDP">
                    pic.jpg
                </View>
            </Grid>
            : 
            null
        }
        </>
    );
}

export default User;