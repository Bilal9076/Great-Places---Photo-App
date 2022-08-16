import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MapPreView from 'react-native-maps'
import { useSelector } from 'react-redux'
import Color from '../Constants/Color';

const PlaceDetailScreen = props => {

        const PlaceId = props.navigation.getParam('placeId');
        const Selectedplace = useSelector(state =>
                state.Places.Places.find(place => place.id === PlaceId)
        );

        const SelectedLocation = { lat: Selectedplace.lat, lng: Selectedplace.lng }

        const LocationHandler = () => {
                props.navigation.navigate('Map', {
                        readonly: true,
                        initialLocation: SelectedLocation,
                });
        };

        return (
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                        <Image style={styles.image} source={{ uri: Selectedplace.ImageUri }} />
                        <View style={styles.locationContainer}>
                                <View style={styles.addressContainer}>
                                        <Text style={styles.text}>{Selectedplace.address}</Text>
                                </View>
                                <MapPreView
                                        style={styles.mappreview}
                                        location={SelectedLocation}
                                        onPress={LocationHandler}
                                />
                        </View>
                </ScrollView>
        )
}

PlaceDetailScreen.navigationOptions = navData => {
        return {
                headerTitle: navData.navigation.getParam('placeTitle')

        }
}
const styles = StyleSheet.create({
        image: {
                width: '100%',
                height: '35%',
                minHeight: 250,
                backgroundColor: '#ccc'
        },
        locationContainer: {
                width: '90%',
                maxWidth: 350,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.26,
                shadowRadius: 8,
                elevation: 5,
                backgroundColor: 'white',
                borderRadius: 10
        },
        addressContainer: {
                padding: 20,
        },
        text: {
                textAlign: 'center',
                fontSize: 18,
                color: Color.primary
        },
        mappreview: {
                width: '100%',
                height: 300,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
        }
});

export default PlaceDetailScreen;

