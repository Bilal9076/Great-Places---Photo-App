import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import Color from '../Constants/Color';


const PlaceItem = props =>{
        return(
     <TouchableOpacity onPress={props.onSelect} style={Styles.placeitem}>
             <Image  style={Styles.image} source={{uri: props.image}}/>
             <View style={Styles.infoContainer}>
                     <Text style={Styles.title}>{props.title}</Text>
                     <Text style={Styles.address}>{props.address}</Text>
             </View>
     </TouchableOpacity>
        );
};
const Styles = StyleSheet.create({
        placeitem: {
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingVertical: 15,
                paddingHorizontal: 25,
                flexDirection: 'row',
                alignItems: 'center'
              },
              image: {
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#ccc',
                borderColor: Color.primary,
                borderWidth: 1
              },
              infoContainer: {
                marginLeft: 18,
                width: 250,
                justifyContent: 'center',
                alignItems: 'flex-start'
              },
              title: {
                color: 'black',
                fontSize: 18,
                marginBottom: 5
              },
              address: {
                color: '#666',
                fontSize: 16
              }
});


export default PlaceItem;