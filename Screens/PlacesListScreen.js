import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import Color from '../Constants/Color';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../Components/PlaceItem';
import * as PlaceAction from '../Store/Places-action'

const PlaceListScreen = props => {
        const dispatch = useDispatch();
        useEffect(() => {
                dispatch(PlaceAction.Setplace())
        }, [dispatch])
        const places = useSelector(state => state.Places.Places)
        return <FlatList data={places} keyExtractor={item => item.id}
                renderItem={itemData => (
                        <PlaceItem image={itemData.item.ImageUri}
                                title={itemData.item.title}
                                address={itemData.item.address}
                                onSelect={() => {
                                        props.navigation.navigate('PlaceDetail',
                                                { placeTitle: itemData.item.title, placeId: itemData.item.id })
                                }}
                        />)} />
}
PlaceListScreen.navigationOptions = navData => {
        return {
                headerTitle: 'All Places',
                headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                                title='Add Place'
                                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                                onPress={() => {
                                        navData.navigation.navigate('NewPlace')
                                }}
                        />
                </HeaderButtons>
        }
};
const Style = StyleSheet.create({});

export default PlaceListScreen;

