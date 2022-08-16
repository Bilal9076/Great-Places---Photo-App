import React,{useState,useCallback} from 'react';
import {View,Text, StyleSheet,ScrollView, TextInput, Button} from 'react-native';
import Color from '../Constants/Color';
import { useDispatch } from 'react-redux';
import * as placesActions from '../Store/Places-action';
import ImagePicker from '../Components/Imagepicker'
import  LocationPicker from '../Components/LocationPicker' 

const NewPlaceScreen = props =>{
        const [titleValue, setTitleValue] = useState('');
        const [SelectedImage,SetSelectedImage]=useState();
        const [Selectedlocation,SetSelectedlocation]= useState()
           const dispatch =useDispatch();

        const titleChangeHandler = text =>{
                setTitleValue(text);
        }

        const savePlaceHandler = () =>{
                dispatch(placesActions.addPlace(titleValue,SelectedImage,Selectedlocation)); 
                props.navigation.goBack();

        };
       const  ImageTakenHandler = ImagePath =>{
        SetSelectedImage(ImagePath)
       }

       const locationpickedhandler = useCallback(location =>{
               console.log(location)
               SetSelectedlocation(location)
       },[SetSelectedlocation])

        return(
        <ScrollView>
        <View style={Style.form}>
                <Text style={Style.Label}>Title</Text>
           <TextInput style={Style.Textinput} 
           onChangeText={titleChangeHandler}
            value={titleValue}
            />
            <ImagePicker OnImageTaken={ImageTakenHandler}/>
            <LocationPicker navigation={props.navigation} onlocationpicked={locationpickedhandler}/>
           <Button title='Save Place' 
           color={Color.primary} 
           onPress={savePlaceHandler}/>
        </View>
        </ScrollView>
        )
}

NewPlaceScreen.navigationOptions = {
        headerTitle:'Add Place'
}
const Style = StyleSheet.create({
        form:{
                margin:30
        },
        Label:{
                marginBottom:10,
                fontSize:18
        },
        Textinput:{
                borderBottomColor:'#ccc',
                borderBottomWidth:1,
                marginBottom:15,
                paddingVertical:4,
                paddingHorizontal:2
        }
});

export default NewPlaceScreen;

