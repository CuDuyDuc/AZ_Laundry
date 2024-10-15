import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../assets/fonts';
import tipAPI from '../apis/tipAPI';
import COLORS from '../assets/colors/Colors';
import { TipModel } from '../model/tip_model';
import TextComponent from './TextComponent';


const { width } = Dimensions.get('window');
const imageWidth = width * 0.916;
const imageHeight = imageWidth * 0.39;

const CardTipCompnent = () => {
    const [tip, setTip] = useState<TipModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getDataTips = async () => {
        try {
            const res = await tipAPI.Handletip('/get-tips');
            const data: TipModel[] = res.data;
            setTip(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching tip: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataTips()
    }, []);

    const renderItem = ({ item }: { item: TipModel }) => (
        <TouchableOpacity style={{ marginEnd: 20 }}>
            <Image
                source={{ uri: item.thumbnail }}
                style={{ width: imageWidth, height: imageHeight }} />
            <View
                style={{
                    backgroundColor: COLORS.WHITE,
                    borderBottomLeftRadius: 9,
                    borderBottomRightRadius: 9,
                    padding: 10,
                }}>
                <TextComponent
                    text={item.title}
                    size={10}
                    font={FONTFAMILY.montserrat_semibold}
                    color={COLORS.DARK_BLUE} />
            </View>
        </TouchableOpacity>
    );
    return (
        <View  >
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
            ) : (
                <FlatList
                    horizontal
                    data={tip}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()} />
            )}

        </View>
    );
};

export default CardTipCompnent;