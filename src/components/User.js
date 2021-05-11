import React from 'react';
import styled from 'styled-components';

const Border = styled.div`
    border-style: solid;
    margin: 10px;
`;

function User({userInfo: { id, name, username, phone}, handleUserClick }) {

    const handleClick = () => {
        handleUserClick(id);
    }

    return (
        <Border>
            <h2>[{id}] {name}, ({username})</h2>
            {/* <p>{address}</p> */}
            <p>{phone}</p>

            <button style={{margin: '5px'}} onClick={handleClick}>Set as user</button>
        </Border>
    );
}

export default User;