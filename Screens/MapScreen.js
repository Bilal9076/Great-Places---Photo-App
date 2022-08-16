import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import Color from '../Constants/Color';

const MapScreen = props => {

        const initialLocation = props.navigation.getParam('initialLocation')
        const readonly = props.navigation.getParam('readonly')
        const [SelectedLocation, SetSelectedLocation] = useState(initialLocation)
        const mapRegion = {
                latitude: initialLocation ? initialLocation.lat:  37.78,
                longitude: initialLocation ? initialLocation.lng: -122.43,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
        }
        const SelectedlocationHandler = event => {
                if(readonly){
                        return;
                }
                SetSelectedLocation({
                        lat: event.nativeEvent.coordinate.latitude,
                        lng: event.nativeEvent.coordinate.longitude
                })
        }

        let MarkerCoordinate
        if (SelectedLocation) {
                MarkerCoordinate = {
                        latitude: SelectedLocation.lat,
                        longitude: SelectedLocation.lng
                }
        }

        const SavelocationHandler = useCallback(() => {
                if (!SelectedLocation) {
                        return (
                 Alert.alert('Sorry', 'please pick some location from map', [{ text: 'Okay' }])
                        )   
                }
                props.navigation.navigate('NewPlace', {
                        pickedlocation: SelectedLocation
                })
                 }, [SelectedLocation])

        useEffect(() => {
                props.navigation.setParams({ saveLocation: SavelocationHandler })
        }, [SavelocationHandler])
        return (
                <MapView
                        style={styles.Mapview}
                        region={mapRegion}
                        onPress={SelectedlocationHandler}
                >
                        {MarkerCoordinate && <Marker title='Picked location' coordinate={MarkerCoordinate}></Marker>}
                </MapView>
        )
}
MapScreen.navigationOptions = navData => {
        const SaveFn = navData.navigation.getParam('saveLocation')
        const readonly = navData.navigation.getParam('readonly')
        if(readonly){
                return;
        }
        return { 
                headerRight:()=>(
                        <TouchableOpacity style={styles.headerButton} onPress={SaveFn}>
                                <Text style={styles.headerButtontext}>Save</Text>
                        </TouchableOpacity>
                )
        }
}
const styles = StyleSheet.create({
        Mapview: {
                flex: 1
        },
        headerButton: {
                marginHorizontal: 20
        },
        headerButtontext: {
                fontSize: 16,
                color: Platform.OS === 'android' ? 'white' : Color.primary
        }
});

export default MapScreen;

