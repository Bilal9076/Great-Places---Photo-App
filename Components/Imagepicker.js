import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native'
import Color from '../Constants/Color'
import * as ImagePicker from 'expo-image-picker'

const ImgPicker = props => {
    const [ImagePicked, SetImagePicked] = useState();
    const TakeImageHandler = async () => {
        const Image = await ImagePicker.launchImageLibraryAsync({
            aspect: [16, 9],
            quality: 0.5,
        });
        SetImagePicked(Image.uri)
        props.OnImageTaken(Image.uri)
    }

    const TakeImageHandlerCamera = async () => {
        const Image = await ImagePicker.launchCameraAsync({
            aspect: [16, 9],
            quality: 0.5,
        });
        SetImagePicked(Image.uri)
        props.OnImageTaken(Image.uri)
    }
    return (
        <View style={styles.ImgPicker}>
            <View style={styles.ImgpickerView}>
                {!ImagePicked ? <Text style={styles.text}>Please Select some Image.</Text>
                    : <Image
                        style={styles.image}
                        source={{ uri: ImagePicked }}
                    />}     
            </View>
            <View style={styles.btncontainer}>
                <View style={styles.btn}>
            <Button
                    title='Gallery'
                    color={Color.primary}
                    onPress={TakeImageHandler} 
                />
                </View>
                <View style={styles.btn}>
                <Button
                    title='Camera'
                    color={Color.primary}
                    onPress={TakeImageHandlerCamera} 
                />
                </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ImgPicker: {
        alignItems: 'center',
        marginBottom:10,
    },
    ImgpickerView: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor:'#b3ecff'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    text:{
        fontSize:15,
        marginBottom:10
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

export default ImgPicker;

// import * as permissions from 'expo-permissions'

// const VerifyPermissions = async ()=>{
//     const result = await permissions.askAsync(permissions.CAMERA)
//     if(result.status !== 'granted'){
//     Alert.alert(
//         'Insufficient permissions',
//         'you need to grant camera permission to use this app',
//         [{text:'Okay'}]
//     )
//     return false;
//     }
//     return true;
// }


 //   const hasPermission = await VerifyPermissions();
    //   if(!hasPermission){
    //       return;
    //   }