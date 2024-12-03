import React from 'react';
import { Image, View } from 'react-native';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { RowComponent, SectionComponent, TextComponent } from '../components';

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
        <RowComponent justify="space-between">
          <Image source={{ uri: imageUrl}} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 10 }} />
          <View style = {{width:"75%"}}>
            <TextComponent text={productName} size={16} color={COLORS.AZURE_BLUE} font={FONTFAMILY.montserrat_bold}/>
            <TextComponent text={short_description} size={16} color={COLORS.AZURE_BLUE} />
            <TextComponent text={`${price.toLocaleString('vi-VN')} VND`} size={18} color={COLORS.RED} font={FONTFAMILY.montserrat_medium}/>
          </View>
        </RowComponent>
      </SectionComponent>
    );
  };
export default CardOrderDetailComponent;
