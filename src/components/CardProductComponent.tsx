import { AddSquare } from 'iconsax-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { useAxiosAddCart } from '../hooks/useAxiosAddCart';
import { ProductModel } from '../model/product';
import { useRole } from '../permission/permission';
import { authSelector } from '../redux/reducers/authReducer';
import ButtonComponent from './ButtonComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props{
    isLoading?:boolean,
    groupProductsByServiceType?:any
    onPress:(item:any)=>void,

}

const CardProductComponent = (props:Props) => {
    const {isLoading,groupProductsByServiceType,onPress}=props
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
    const user = useSelector(authSelector)
    const {isUser}= useRole()
  const toggleShowMore = (serviceTypeName: string) => {
    setExpandedGroups((prev:any) => ({
      ...prev,
      [serviceTypeName]: !prev[serviceTypeName],
    }));
  };
    const renderItem = ({ item }: { item: ProductModel }) => (
        <TouchableOpacity style={{marginBottom:15,backgroundColor:COLORS.WHITE, padding: 8, borderRadius: 16 }} onPress={() => onPress(item)}>
            <RowComponent>
                <Image source={{uri:item.product_photo[0]}} style={{ width: 80, height: 80, borderRadius:8 }} />
                <View style={{ width: '78%', paddingHorizontal: 10 }}>
                    <TextComponent text={item.product_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                    <TextComponent styles={{ paddingVertical: 3 }} text={item.short_description} color={COLORS.HEX_LIGHT_GRAY} size={13} />
                    <RowComponent justify='space-between'>
                        <TextComponent text={`${item.product_price?.toLocaleString('vi-VN')} VNĐ`} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium}/>
                        {isUser?(
                            <TouchableOpacity onPress={()=> useAxiosAddCart({id_product:item._id, id_user:user.id,cart_subtotal:item.product_price,product_quantity:1})}>
                                <AddSquare size={25} variant='Bold' color={COLORS.AZURE_BLUE} />
                            </TouchableOpacity>
                        ):(<View></View>)}
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