import place from "../Models/Place";
import { ADD_PLACE,SET_PLACE } from "./Places-action";

const initialState = {
        Places: []
};

export default (state = initialState, action) => {
        switch (action.type) {
                case SET_PLACE:
                        return {
                                Places:action.places.map(pl=> new place(
                                        pl.id.toString(),
                                        pl.title,
                                        pl.ImageUri,
                                        pl.address,
                                        pl.lat,
                                        pl.lng,
                                ))
                        }
                case ADD_PLACE:
                        const newPlace = new place(
                                action.PlaceData.id.toString(),
                                action.PlaceData.title,
                                action.PlaceData.Image,
                                action.PlaceData.address,
                                action.PlaceData.coords.lat,
                                action.PlaceData.coords.lng,
                                )
                        return {
                                Places: state.Places.concat(newPlace)
                        }
                default:
                        return state;
        }

};