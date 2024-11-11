import React from 'react';
import { Image, StyleProp, View, ImageStyle, TouchableOpacity } from 'react-native';
import { RowComponent, SectionComponent, ButtonComponent, TextComponent } from '../components';
import COLORS from '../assets/colors/Colors';
import { FONTFAMILY } from '../../assets/fonts';
import IMAGES from '../assets/images/Images';

interface Props {
    productName: string;
    short_description: string;
    price: number;
    imageUrl?: string;
}


const CardOrderDetailComponent = (props: Props) => {
    const { productName, short_description, price, imageUrl } = props;
  
    return (
      <SectionComponent>
        
        <RowComponent justify="space-between" styles={{ alignItems: 'flex-start' }}>
          <Image source={{ uri: imageUrl}} style={{ width: 100, height: 100, marginRight: 10 }} />
          <View style={{ width: '78%' }}>
            <TextComponent text={productName} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold}/>
            <TextComponent text={short_description} size={16} color={COLORS.HEX_BLACK} />
            <TextComponent text={`${price.toLocaleString('vi-VN')} VND`} size={18} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold}/>
          </View>
        </RowComponent>

      </SectionComponent>
    );
  };
export default CardOrderDetailComponent;
