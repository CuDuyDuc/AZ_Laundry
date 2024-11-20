import { AddSquare, Minus } from 'iconsax-react-native';
import React from 'react';
import { ActivityIndicator, Animated, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { useAxiosAddCart } from '../hooks/useAxiosAddCart';
import { CartModel } from '../model/cart_model';
import { ProductModel } from '../model/product';
import { useRole } from '../permission/permission';
import { authSelector } from '../redux/reducers/authReducer';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';

interface Props {
    products?: ProductModel[];
    carts?: CartModel[];
    isLoading?: boolean;
    isCart?: boolean;
    onPress?: (data: any) => void ;
    onPressMinus?: (data: CartModel) => void ;
    onPressPlus?: (data: CartModel) => void ;
    onPressDelete?: (data: CartModel) => void ;
}

const CardProductOfProductType = (props: Props) => {
    const user = useSelector(authSelector);
    const { isUser } = useRole();
    const { products, carts, isLoading, isCart,onPressMinus, onPressPlus ,onPressDelete,onPress} = props;
    const renderRightActions = (item:CartModel) => (
        (progressAnimatedValue: Animated.AnimatedInterpolation<string | number>, dragAnimatedValue: Animated.AnimatedInterpolation<string | number>) => (
            <TouchableOpacity onPress={() => onPressDelete && onPressDelete(item)}>
                <SectionComponent
                    styles={{
                        backgroundColor: COLORS.RED,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 75,
                        height: '85%',
                        borderRadius: 10,
                    }}>
                    <TextComponent text={'Xoá'}  font={FONTFAMILY.montserrat_medium}/>
                </SectionComponent>
            </TouchableOpacity>
        )
    );
    const renderCartItem = ({ item }: { item: CartModel }) => (
        <Swipeable renderRightActions={renderRightActions(item)}>
            <TouchableOpacity onPress={()=>onPress&& onPress(item)} style={{ marginBottom: 15, backgroundColor: COLORS.WHITE, padding: 8, borderRadius: 16 }}>
                <RowComponent>
                    <Image source={{ uri: item.id_product.product_photo[0] }} style={{ width: 80, height: 80, borderRadius: 8 }} />
                    <View style={{ width: '78%', paddingHorizontal: 10 }}>
                        <RowComponent justify='space-between'>
                            <TextComponent text={item.id_product.product_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                            <TextComponent text={item.id_product?.id_product_type?.id_service_type?.service_type_name} color={COLORS.HEX_LIGHT_GRAY} font={FONTFAMILY.montserrat_medium} size={13} />
                        </RowComponent>
                        <TextComponent styles={{ paddingVertical: 3 }} text={item.id_product.short_description} color={COLORS.HEX_LIGHT_GRAY} size={13} />
                        <RowComponent justify='space-between'>
                            <TextComponent text={`${item.cart_subtotal} vnđ`} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} />
                            <RowComponent justify='space-between'>
                                <TouchableOpacity onPress={()=>onPressMinus && onPressMinus(item)}>
                                    <Minus size={25} variant='Bold' color={COLORS.AZURE_BLUE} />
                                </TouchableOpacity>
                                <TextComponent text={item.product_quantity.toString()} color={COLORS.GRAY_WHITE} font={FONTFAMILY.montserrat_medium} styles={{ marginHorizontal: 5 }} />
                                <TouchableOpacity onPress={()=>onPressPlus && onPressPlus(item)}>
                                    <AddSquare size={25} variant='Bold' color={COLORS.AZURE_BLUE} />
                                </TouchableOpacity>
                            </RowComponent>
                        </RowComponent>
                        <TextComponent text={`${item.id_product.id_user.data_user.shop_name}`} color={COLORS.HEX_LIGHT_GRAY} font={FONTFAMILY.montserrat_regular} size={13} />
                    </View>
                </RowComponent>
            </TouchableOpacity>
        </Swipeable>
    );
    const renderProductItem = ({ item }: { item: ProductModel }) => (
        <TouchableOpacity onPress={()=>onPress && onPress(item)} style={{ marginBottom: 15, backgroundColor: COLORS.WHITE, padding: 8, borderRadius: 16 }}>
            <RowComponent>
                <Image source={{ uri: item.product_photo[0] }} style={{ width: 80, height: 80, borderRadius: 8 }} />
                <View style={{ width: '78%', paddingHorizontal: 10 }}>
                    <TextComponent text={item.product_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                    <TextComponent styles={{ paddingVertical: 3 }} text={item.short_description} color={COLORS.HEX_LIGHT_GRAY} size={13} />
                    <RowComponent justify='space-between'>
                        <TextComponent text={`${item.product_price} vnđ`} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} />
                        {isUser && (
                            <TouchableOpacity onPress={() => useAxiosAddCart({ id_product: item._id, id_user: user.id, cart_subtotal: item.product_price, product_quantity: 1 })}>
                                <AddSquare size={25} variant='Bold' color={COLORS.AZURE_BLUE} />
                            </TouchableOpacity>
                        )}
                    </RowComponent>
                </View>
            </RowComponent>
        </TouchableOpacity>
    );
    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
            ) : (
                isCart ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:300}}
                        data={carts} 
                        renderItem={renderCartItem} 
                        keyExtractor={(item) => item._id.toString()} 
                    />
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products} 
                        renderItem={renderProductItem} 
                        keyExtractor={(item) => item._id.toString()} 
                    />
                )
            )}
        </View>
    );
};

export default CardProductOfProductType;
