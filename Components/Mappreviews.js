import React from 'react'
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native'
 
const MapPreviews = (props)=>{
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.ImgpickerView,...props.style}} >
                  {props.location ? <Image style={styles.img} source={{uri:'https://geology.com/world/world-map.gif'}}/> : props.children}
                </TouchableOpacity>
    )   

}
const styles= StyleSheet.create({
    ImgpickerView:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
    width:'100%',
    height:'100%'
    }
});
export default  MapPreviews;