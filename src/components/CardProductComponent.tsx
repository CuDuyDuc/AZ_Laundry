import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import { ProductModel } from '../model/product';
import RowComponent from './RowComponent';
import IMAGES from '../assets/images/Images';
import COLORS from '../assets/colors/Colors';
import TextComponent from './TextComponent';
import { FONTFAMILY } from '../../assets/fonts';
import { AddSquare, Minus } from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';

interface Props{
    isLoading?:boolean,
    groupProductsByServiceType?:any
    isCart:boolean
}

const CardProductComponent = (props:Props) => {
    const {isLoading,groupProductsByServiceType,isCart}=props
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

  // Function to toggle "show more" or "show less"
  const toggleShowMore = (serviceTypeName: string) => {
    setExpandedGroups((prev:any) => ({
      ...prev,
      [serviceTypeName]: !prev[serviceTypeName],
    }));
  };
    const renderItem = ({ item }: { item: ProductModel }) => (
        <TouchableOpacity style={{marginBottom:15,backgroundColor:COLORS.WHITE, padding: 8, borderRadius: 16 }}>
            <RowComponent>
                <Image source={{uri:item.product_photo[0]}} style={{ width: 80, height: 80, borderRadius:8 }} />
                <View style={{ width: '78%', paddingHorizontal: 10 }}>
                    <TextComponent text={item.product_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                    <TextComponent styles={{ paddingVertical: 3 }} text={item.short_description} color={COLORS.HEX_LIGHT_GRAY} size={13} />
                    <RowComponent justify='space-between'>
                        <TextComponent text={`${item.product_price} vnđ`} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium}/>
                        {isCart?(
                            <RowComponent justify='space-between'>
                                <TouchableOpacity>
                                    <Minus size={25} variant='Bold' color={COLORS.GRAY_WHITE} />
                                </TouchableOpacity>
                                <TextComponent text={'02'} color={COLORS.GRAY_WHITE} font={FONTFAMILY.montserrat_medium} styles={{marginHorizontal:5}}/>
                                <TouchableOpacity>
                                    <AddSquare size={25} variant='Bold' color={COLORS.GRAY_WHITE} />
                                </TouchableOpacity>
                        </RowComponent>
                        ):(
                            <TouchableOpacity>
                                <AddSquare size={25} variant='Bold' color={COLORS.AZURE_BLUE} />
                            </TouchableOpacity>
                        )}
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
                data={Object.keys(groupProductsByServiceType)}
                keyExtractor={(item)=>item}
                contentContainerStyle={{paddingBottom:'auto'}}
                renderItem={({item:serviceTypeName})=>{
                    const isExpanded = expandedGroups[serviceTypeName] ?? false; // Check if the group is expanded
                    const products = groupProductsByServiceType[serviceTypeName];
                    const productsToShow = isExpanded ? products : products.slice(0, 2); // Show all or only 2 products
        
                return(
                    <View style={{marginTop:15, }}>
                        <TextComponent text={serviceTypeName} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_medium} />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={productsToShow}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id.toString()} />
                        <View style={{alignItems:'center'}}>
                            {products.length > 2 && (
                                <ButtonComponent onPress={() => toggleShowMore(serviceTypeName)} type='link' text= {isExpanded ? 'Thu gọn' : 'Xem thêm'}/> 
                            )}
                        </View>
                    </View>
                 )}
                }
            />
        )}

    </View>
  )
}

export default CardProductComponent