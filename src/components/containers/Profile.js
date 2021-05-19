import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, View } from '@adobe/react-spectrum';

function Profile(props) {

    const is3Cols = useMediaQuery({ minWidth: 1300 });
    const is2Cols = useMediaQuery({ minWidth: 1339 });
    const is1Cols = useMediaQuery({ minWidth: 800 });

    return (
        <View backgroundColor="gray-300" borderRadius="medium">
            <Grid
                areas={['UserInfo', 'Stats', 'UserDesc']}
                rows={['2fr', '1fr', '1fr']}
                columns={['1fr']}
                marginX="size-200"
            >
                <View gridArea="UserInfo">
                    <Grid
                        areas={['UserPicture UserNameHandle']}
                        columns={['size-1250', 'auto']}
                    >
                        <View gridArea="UserPicture">
                            img.jpg
                        </View>

                        <View gridArea="UserNameHandle">
                            <h3>Jason Siervo</h3>
                            <p style={{marginTop: -15}}>@jasondotjson</p>
                        </View>
                    </Grid>
                </View>

                <View gridArea="Stats">
                    <Grid
                        areas={['Followers Following']}
                        columns={['size-1250', 'size-1600']}
                        rows={['1fr']}
                    >
                        <View gridArea="Followers">
                            <p style={{fontSize: 15}}>2k followers</p>
                        </View>

                        <View gridArea="Following">
                            <p style={{fontSize: 15}}>18 following</p>
                        </View>
                    </Grid>
                </View>

                <View gridArea="UserDesc">
                    <p>Be who you needed when you were younger</p>
                </View>

            </Grid>
        </View>
    );
}

export default Profile;