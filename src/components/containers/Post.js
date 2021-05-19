import React from 'react';
import {Grid, View} from '@adobe/react-spectrum'

function Post(props) {
    return (
        <View
            borderWidth="thin"
            borderColor="dark"
            borderRadius="medium"
            paddingBottom="size-350"
            paddingLeft="size-250"
            paddingTop="size-10"
            paddingRight="size-250"
            gridColumn="start"
            backgroundColor="gray-300"
            marginY="size-200"
        >
            <Grid
                areas={['Title Indicator', 'Content Content']}
                columns={['15fr', 'size-500']}
                rows={['size-450', 'size-600']}
                justifyItems="start"
                alignItems="start"
            >
                <View gridArea="Title" font>
                    <h3>Discussion of everything</h3>
                </View>

                <View gridArea="Indicator">
                    <p>🔴 15</p>
                </View>

                <View gridArea="Content">
                    <p>HoloPanio, DogeBoss 🐶, aaronTheZinc</p>
                </View>
            </Grid>
        </View>
    );
}

export default Post;