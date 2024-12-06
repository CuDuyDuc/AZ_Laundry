import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import {
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import reviewAPI from '../../apis/reviewAPI';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import { globalStyle } from '../../styles/globalStyle';

const ReviewShopScreen = ({ navigation }: any) => {
  const user = useSelector(authSelector);
  const [reviews, setReviews] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getDataReview = async () => {
    try {
      setLoading(true);
      const res: any = await reviewAPI.HandleReview(`/get-review-by-shop/${user?.id}`);
      const data = res.data;
      setReviews(data);
      console.log('Reviewwwww: ', data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    getDataReview();
  }, []);

  const renderItem = ({ item }: any) => (
    <SectionComponent styles={[{ paddingHorizontal: 10, paddingVertical: 10, marginBottom: 5, borderRadius: 15 }, globalStyle.shadow]}>
      <RowComponent>
        <Image
          source={item.id_user?.photo ? { uri: item.id_user.photo } : IMAGES.user}
          style={styles.profileImage}
        />
        <SectionComponent styles={{ flex: 1, marginTop: 20 }}>
          <TextComponent
            text={item.id_user?.fullname || 'Người dùng'}
            color={COLORS.HEX_BLACK}
            font={FONTFAMILY.montserrat_bold}
            size={16}
          />
          <TextComponent
            text={new Date(item.createdAt).toLocaleString()}
            color={COLORS.HEX_LIGHT_GRAY}
            size={12}
            styles={{ marginTop: 4 }}
          />
        </SectionComponent>
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={IMAGES.star}
              style={[
                styles.star,
                {
                  tintColor:
                    index < item.rating ? COLORS.HEX_YELLOW : COLORS.HEX_LIGHT_GREY,
                },
              ]}
            />
          ))}
        </View>
      </RowComponent>
      <TextComponent text={item.comment} color={COLORS.HEX_BLACK} size={14} />
      <RowComponent styles={{ marginTop: 10 }}>
        {item.images && item.images.length > 0 && item.images.map((image: string, idx: number) => (
          <Image
            key={idx}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
      </RowComponent>
    </SectionComponent>
  );

  return (
    <ContainerComponent>
      <HeaderComponent
        title="Đánh giá về cửa hàng"
        isBack
        onBack={() => navigation.goBack()}
      />
      <SectionComponent styles={{ marginTop: 20 , paddingBottom: 270}}>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  star: {
    width: 15,
    height: 15,
    marginHorizontal: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default ReviewShopScreen;
