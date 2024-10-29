import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { globalStyle } from '../styles/globalStyle';

interface Props {
    width?: number;
    height?: number;
    styles?: StyleProp<ViewStyle>;
}

const LineComponent = (props: Props) => {
    const { width, height, styles } = props;
    return <View style={[{ width, height }, styles, globalStyle.lineView]}></View>;
};

export default LineComponent;
