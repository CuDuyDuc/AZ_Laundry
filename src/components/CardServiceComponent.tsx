import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import COLORS from '../assets/colors/Colors';
import serviceAPI from '../apis/serviceAPI'; 
import { FONTFAMILY } from '../../assets/fonts';

interface ServiceType {
    _id: string;
    service_type_name: string;
    service_type_icon: string;  
}

const CardServiceComponent = () => {
    const [typeService, setTypeService] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getDataService_Type = async () => {
        try {
            const res = await serviceAPI.HandleService('/get-service-type');
            const data: ServiceType[] = await res.data;
            // console.log(data)
            setTypeService(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching service types: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataService_Type();
    }, []);

    const renderItem = ({ item }: { item: ServiceType }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.service_type_icon }} style={styles.icon} />
            <Text style={styles.serviceName}>{item.service_type_name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
            ) : (
                <FlatList
                    data={typeService}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    numColumns={3}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
        width: '30%',
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    serviceName: {
        color: COLORS.OCEAN_BLUE,
        fontFamily: FONTFAMILY.montserrat_medium,
        textAlign: 'center',
    },
});

export default CardServiceComponent;
