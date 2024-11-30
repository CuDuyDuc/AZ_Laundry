import { Location, Star1 } from 'iconsax-react-native'
import React from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { FONTFAMILY } from '../../assets/fonts'
import COLORS from '../assets/colors/Colors'
import { useAxiosGetShops } from '../hooks/useAxiosGetShops'
import { UserModel } from '../model/user_model'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
interface Props {
    currentLatitude?: number | null,
    currentLongitude?: number | null,
    limit?: number,
    onPress:(item:any)=>void,
    id_product_type?:any
}

const CardShopComponent = (props: Props) => {
    const { currentLatitude, currentLongitude, limit,onPress,id_product_type } = props
    const {shop, loading}= useAxiosGetShops({currentLatitude,currentLongitude,limit,id_product_type})
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Bán kính của Trái Đất tính bằng km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Khoảng cách tính bằng km
    };

    const renderItem = ({ item }: { item: UserModel }) => {

        const distance = calculateDistance(
            currentLatitude!,
            currentLongitude!,
            item.location?.coordinates[1]!,
            item.location?.coordinates[0]!
        );
        return (
            <TouchableOpacity onPress={()=>onPress(item)} style={{ marginTop: 15, backgroundColor: COLORS.WHITE, padding: 7, borderRadius: 16 }} >
                <RowComponent >
                    <Image source={{ uri: item.data_user.thumbnail }} style={{ width: 80, height: 80, borderRadius:8 }} />
                    <View style={{ width: '78%', paddingHorizontal: 10 }}>
                        <TextComponent text={item.data_user.shop_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                        <TextComponent styles={{ paddingVertical: 3 }} text={item.address} color={COLORS.HEX_LIGHT_GRAY} size={13} />
                        <RowComponent justify='space-between'>
                            <RowComponent>
                                <Star1 size={13} variant="Bold" color={COLORS.YELLOW} />
                                <TextComponent styles={{ marginLeft: 5 }} text={item.data_user.star_rating} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} size={13} />
                            </RowComponent>
                            <RowComponent>
                                <Location size={13} variant="Bold" color={COLORS.HEX_BLACK} />
                                <TextComponent styles={{ marginLeft: 5 }} text={`${distance.toFixed(2)} Km`} color={COLORS.HEX_LIGHT_GRAY} font={FONTFAMILY.montserrat_medium} size={13} />
                            </RowComponent>
                        </RowComponent>
                    </View>
                </RowComponent>
            </TouchableOpacity>
        )
    };
    return (
        <View >
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
            ) : (
                <FlatList
                    data={shop}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()} />
            )}

        </View>
    )
}

export default CardShopComponent