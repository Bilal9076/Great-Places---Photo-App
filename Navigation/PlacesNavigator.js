import React from 'react';
import {createAppContainer} from 'react-navigation';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import MapScreen from '../Screens/MapScreen';
import NewPlaceScreen from '../Screens/NewPlaceScreen';
import PlaceDetailScreen from '../Screens/PlaceDetailScreen';
import PlaceListScreen from '../Screens/PlacesListScreen';
import Colors from '../Constants/Color';

const PlacesNavigator = createStackNavigator({
        Places:PlaceListScreen,
        PlaceDetail: PlaceDetailScreen,
        NewPlace: NewPlaceScreen,
        Map: MapScreen

},
{
        defaultNavigationOptions: {
          headerStyle:{
                       backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
          },
          headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primary
}
}          
);

export default createAppContainer(PlacesNavigator);