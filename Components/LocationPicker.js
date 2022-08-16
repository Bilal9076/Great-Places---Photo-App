import React, { useState,useEffect} from 'react'
import { View, Text, Image, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native'
import Color from '../Constants/Color'
import * as Location from 'expo-location'
import MapPreview from './MapPreview'
import MapPreviews from './Mappreviews'

const LocationPicker = props => {
    const [LocationPicked, SetLocationPicked] = useState();
    const [pickedLocation,SetPickedLocation] = useState()
    const [Isfetching, SetIsfetching] = useState(false)

    const mapPickedlocation = props.navigation.getParam('pickedlocation')

      const {onlocationpicked}= props
    useEffect(()=>{
        SetLocationPicked(null)
        if(mapPickedlocation){
            SetPickedLocation(mapPickedlocation)
            onlocationpicked(mapPickedlocation)
        } 
    },[mapPickedlocation,onlocationpicked])

const VerifyPermissions = async ()=>{
    const result = await Location.requestForegroundPermissionsAsync()
    if(result.status !== 'granted'){
    Alert.alert(
        'Insufficient permissions',
        'you need to grant camera permission to use this app',
        [{text:'Okay'}]
    )
    return false;
    }
    return true;
}

    const TakeLocationHandler = async () => {
            const hasPermission = await VerifyPermissions();
      if(!hasPermission){
          return false;
      }
        try {
            SetIsfetching(true)
            const location = await Location.getCurrentPositionAsync({
             accuracy:Location.Accuracy.Lowest
            })
            // console.log(location)
            SetLocationPicked({
                lat:location.coords.latitude,
                lng:location.coords.longitude
            })
            props.onlocationpicked({
                lat:location.coords.latitude,
                lng:location.coords.longitude
            })
        } catch (err) {
            console.log(err.message)
            // throw err
            Alert.alert(
                'Could not fetch location!',
                'please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            )
             
        }
        SetIsfetching(false)

    }
const PickonMap = ()=>{
    props.navigation.navigate('Map')
}

    return (
        <View style={styles.ImgPicker}>
            {LocationPicked?<MapPreview 
            style={styles.ImgpickerView} 
            location={LocationPicked}
            onPress={PickonMap}
            >
            {Isfetching ? (
            <ActivityIndicator size='large' color={Color.primary} />
            ) :
                    (<Text style={styles.text}>Please Select some Location.</Text>)  }
            </MapPreview>:
            <MapPreviews 
            style={styles.ImgpickerView} 
            location={pickedLocation}
            onPress={PickonMap}
            >
            {Isfetching ? (
            <ActivityIndicator size='large' color={Color.primary} />
            ) :
                    (<Text style={styles.text}>Please Select some Location.</Text>)  }
            </MapPreviews>
            }
            
            <View style={styles.btncontainer}>
                <View style={styles.btn}>
            <Button
                    title='Location'
                    color={Color.primary}
                    onPress={TakeLocationHandler} 
                />
                </View>
                <View style={styles.btn}>
                <Button
                    title='Pick on map'
                    color={Color.primary}
                    onPress={PickonMap} 
                />
                </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ImgPicker: {
        alignItems: 'center',
        marginBottom: 10,
    },
    ImgpickerView: {
        width: '100%',
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#b3ecff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%'
    },
    text: {
        fontSize: 15,
        marginBottom: 10
    },
    btncontainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5
    },
    btn:{ 
        width:'35%'
    }
})

export default LocationPicker;