import {View, Text, DimensionValue} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import { globalStyle } from '../styles/globalStyle';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';

interface Props {
  dataLocation: any;
  onDataLocation: (data: any) => void;
  widthPicker?:DimensionValue | undefined
}

const PickerComponent = (props: Props) => {
  const {dataLocation, onDataLocation,widthPicker} = props;
  const [selectedValue, setSelectedValue] = useState<any>(null);
  useEffect(() => {
    setSelectedValue(dataLocation[0]);
  }, [dataLocation]);
  useEffect(() => {
    onDataLocation(selectedValue);
  }, [selectedValue]);

  return (
    <View
      style={[{
        width:widthPicker??'100%',
        borderRadius: 13,
        marginBottom: 10,
        backgroundColor:COLORS.WHITE
      }]}>
      <Picker
        dropdownIconColor={COLORS.HEX_BLACK}
        selectedValue={selectedValue}
        style={{
          color: COLORS.HEX_BLACK,
        }}
        onValueChange={(item: any) => setSelectedValue(item)}>
        {dataLocation?.map((option: any) => {
          return (
            <Picker.Item
              key={option.id}
              label={option.full_name}
              value={option}
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default PickerComponent;
