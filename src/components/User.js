import React from 'react';
import styled from 'styled-components';
import {Provider, defaultTheme, Button} from '@adobe/react-spectrum';

const Border = styled.div`
    border-style: solid;
    margin: 10px;
    border-radius: 70px;
`;

function User({userInfo: { id, name, username, phone}, handleUserClick }) {

    const handleClick = () => {
        handleUserClick(id);
    }

    return (
        <Provider colorScheme="dark" theme={defaultTheme}>
            <Border>
                <h2>[{id}] {name}, ({username})</h2>
                {/* <p>{address}</p> */}
                <p>{phone}</p>

                <Button variant="cta" style={{margin: '5px'}} onPress={handleClick}>Set as user</Button>
            </Border>
        </Provider>
    );
}

export default User;