import React from 'react';
import {StyleProp, StyleSheet, TextStyle, ActivityIndicator} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../assets/colors/Colors';
interface props {
  items: {label: string; value: string}[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  isLoading: boolean;
}
const SpinnerComponent = (props: props) => {
  const {items, placeholder, onValueChange, isLoading } = props;
  return (<>
  
  {
      isLoading ?  (<ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />) 
      : (
        <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        placeholder={{label: placeholder, value: null}}
        style={{
          inputAndroid: styless.input,
        }}
      />
      )
    }
  </>
  );
};

const styless = StyleSheet.create({
  input: {
    fontSize: 14,
    color: COLORS.HEX_BLACK,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: COLORS.WHITE,
  },
});

export default SpinnerComponent;
