import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import COLORS from '../assets/colors/Colors';
import { FONTFAMILY } from '../../assets/fonts';

interface Props {
  data?: any[];
  isLoading?: boolean;
  onPress: (item: any) => void;
}

const numColumns = 3;

const CardServiceComponent = (props: Props) => {
  const { data = [], isLoading, onPress } = props;
  const fillEmptySlots = (data: any[]) => {
    const remainder = data.length % numColumns;
    if (remainder !== 0) {
      const emptySlots = numColumns - remainder;
      for (let i = 0; i < emptySlots; i++) {
        data.push({ _id: `empty-${i}`, empty: true }); 
      }
    }
    return data;
  };
  const dataWithEmptySlots = fillEmptySlots([...data]);
  const renderItem = ({ item }: { item: any }) => {
    if (item.empty) {
      return <View style={[styles.card, styles.invisibleCard]} />; 
    }
    return (
      <TouchableOpacity onPress={() => onPress(item)} style={styles.card}>
        <Image source={{ uri: item.service_type_icon ?? item.product_type_icon }} style={styles.icon} />
        <Text style={styles.serviceName}>{item.service_type_name ?? item.product_type_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
      ) : (
        <FlatList
          data={dataWithEmptySlots}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom:15,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '31%',
    marginBottom: 10,
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
    fontSize: 12,
  },
  invisibleCard: {
    backgroundColor: 'transparent', 
  },
});

export default CardServiceComponent;
