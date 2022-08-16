import React from 'react'
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native'
import ENV from '../Env';
 
const MapPreview = (props)=>{
    let ImageUrl;
    // if(props.location){
    //     // const ImageUrl= 'http://www.sialnews.com/images/2013/10/Jauharabad-Map.jpg'
    //     // const ImageUrl= `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApikey}`
    //     console.log(ImageUrl)
    // }
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.ImgpickerView,...props.style}} >
                  {props.location ? <Image style={styles.img} source={{uri:'http://www.sialnews.com/images/2013/10/Jauharabad-Map.jpg'}}/> : props.children}
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
export default  MapPreview;