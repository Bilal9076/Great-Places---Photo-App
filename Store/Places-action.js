export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';
import * as FileSystem from 'expo-file-system'
import { InsertPlace, fetchData } from '../helpers/db'

export const addPlace = (title, Image, location) => {
        return async dispatch => {
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyAqjxs9o9KdPbkFhtUnAczPkOImMgrAWQs`)
                if (!response.ok) {
                        throw new Error('Something went wrong')
                }
                const resData = await response.json();
                if (!resData.results) {
                        throw new Error('Something went wrong')
                }
                // const address = resData.results[0].formatted_address;

                const fileName = Image.split('/').pop();
                const NewPath = FileSystem.documentDirectory + fileName;
                try {
                        await FileSystem.moveAsync({
                                from: Image,
                                to: NewPath
                        })
                        const dbResult = await InsertPlace(
                                title,
                                NewPath,
                                'World',
                                location.lat,
                                location.lng);
                        dispatch({
                                type: ADD_PLACE,
                                PlaceData: {
                                id: dbResult.insertId,
                                 title: title, 
                                 Image: NewPath, 
                                 address: 'World', 
                                 coords: {
                                        lat:location.lat,
                                        lng:location.lng
                                        }
                                }
                        })
                } catch (err) {
                        console.log(err);
                        throw err
                }
        }
}

export const Setplace = () => {
        return async dispatch => {
                try {
                        const DBresult = await fetchData();
                        console.log(DBresult)
                        dispatch({ type: SET_PLACE, places: DBresult.rows._array })
                } catch (err) {
                        throw err
                }
        }
}