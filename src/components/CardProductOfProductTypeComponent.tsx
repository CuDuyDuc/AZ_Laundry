import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { ProductModel } from '../model/product';
import COLORS from '../assets/colors/Colors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { FONTFAMILY } from '../../assets/fonts';
import { AddSquare } from 'iconsax-react-native';

interface Props{
    products?:ProductModel[]
    isLoading?:boolean
}

const CardProductOfProductType = (props:Props) => {
    const {products,isLoading} =props
    const renderItem = ({ item }: { item: ProductModel }) => (
        <TouchableOpacity style={{marginBottom:15,backgroundColor:COLORS.WHITE, padding: 8, borderRadius: 16 }}>
            <RowComponent>
                <Image source={{uri:item.product_photo[0]}} style={{ width: 80, height: 80, borderRadius:8 }} />
                <View style={{ width: '78%', paddingHorizontal: 10 }}>
                    <TextComponent text={item.product_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                    <TextComponent styles={{ paddingVertical: 3 }} text={item.short_description} color={COLORS.HEX_LIGHT_GRAY} size={13} />
                    <RowComponent justify='space-between'>
                        <TextComponent text={`${item.product_price} vnđ`} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium}/>
                        <TouchableOpacity>
                            <AddSquare size={25} variant='Bold' color={COLORS.AZURE_BLUE} />
                        </TouchableOpacity>
                    </RowComponent>
                </View>
            </RowComponent>
        </TouchableOpacity>
    );
  return (
    <View >
    {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
    ) : (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()} />
    )}

    </View>
  )
}

export default CardProductOfProductType