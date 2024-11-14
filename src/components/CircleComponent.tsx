import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

// Định nghĩa kiểu cho các props của CircleComponent
interface CircleComponentProps {
    color?: string;
    size?: number;
}

const CircleComponent: React.FC<CircleComponentProps> = ({ color = 'blue', size = 50 }) => {
    const circleStyle: ViewStyle = {
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: size / 2,
    };

    return <View style={[styles.circle, circleStyle]} />;
};

// Styles cho CircleComponent
const styles = StyleSheet.create({
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CircleComponent;
