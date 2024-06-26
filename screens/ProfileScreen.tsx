import React from 'react';
import {Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//import MapView, { Marker } from 'react-native-maps';

const ProfileScreen: React.FC = () => {
    const shopLocation = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Barber Shop</Text>
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC1qaPjRyXggQQ6VQ_zrreWfICmxaeo0GIFw&s' }} 
                style={{ width: 300, height: 200, marginBottom: 20 }}
            />
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Name: The Classic Barber</Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Location:</Text>
            {/* <MapView
                style={{ width: '100%', height: 300 }}
                initialRegion={shopLocation}
            >
                <Marker
                    coordinate={shopLocation}
                    title="The Classic Barber"
                    description="Your favorite place for haircuts!"
                />
            </MapView> */}
            <Text style={{ fontSize: 14, marginBottom: 10 }}>Open Time: 9.00 A.M.</Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>Close Time: 7.00 P.M.</Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>Open Days: Everyday (except Poya Day)</Text>

        </ScrollView>
    );
};

export default ProfileScreen;
