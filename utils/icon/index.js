import React from "react";


const IconComponent = {
    Feather: () => {
        return require('react-native-vector-icons/Feather').default
    },
    MaterialCommunityIcons: () => {
        return require('react-native-vector-icons/MaterialCommunityIcons').default
    },
    Ionicons: () => {
        return require('react-native-vector-icons/Ionicons').default
    }
};

export function getIcon(option) {
    let el = IconComponent[option.iconSet]();
    return React.createElement(el, {
        name: option.icon,
        color: option.color ? option.color : "#333333",
        size: option.size ? option.size : 20
    });
}
