import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { Platform } from "react-native";
import Color from "../Constants/Color";


const CustomHeaderButton = props =>{
        return ( 
        <HeaderButton 
        {...props}
                IconComponent={Ionicons}
                iconSize={23}
                color={Platform.OS === 'android' ? 'white' : Color.primary}
                />
        ); 
};

export default CustomHeaderButton;