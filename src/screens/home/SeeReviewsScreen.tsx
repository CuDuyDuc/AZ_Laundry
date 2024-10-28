import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import IMAGES from '../../assets/images/Images';
import {
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import COLORS from '../../assets/colors/Colors';
import {FONTFAMILY} from '../../../assets/fonts';
import {Star1} from 'iconsax-react-native';

const reviews = [
  {
    id: 1,
    avt: IMAGES.GiatHap,
    name: 'Trần Văn A',
    rating: IMAGES.star,
    date: '28 tháng 6, 22:56',
    review: 'Giặt đồ thơm, ủi thẳng khá ưng ý',
    image: IMAGES.ImgShop, // Trỏ đến đúng ảnh
  },
  {
    id: 2,
    avt: IMAGES.GiatHap,
    name: 'Võ Thị Thu Thủy',
    rating: IMAGES.star,
    date: '28 tháng 6, 22:56',
    review: 'Giặt đồ thơm, ủi thẳng khá ưng ý',
    image: IMAGES.ImgShop, // Trỏ đến đúng ảnh
  },
  {
    id: 3,
    avt: IMAGES.GiatHap,
    name: 'Nguyễn Văn B',
    rating: IMAGES.star,
    date: '28 tháng 6, 22:56',
    review: 'Giặt đồ thơm, ủi thẳng khá ưng ý',
    image: IMAGES.ImgShop, // Trỏ đến đúng ảnh
  },
  {
    id: 4,
    avt: IMAGES.GiatHap,
    name: 'Hà Thảo Nhi',
    rating: IMAGES.star,
    date: '28 tháng 6, 22:56',
    review: 'Giặt đồ thơm, ủi thẳng khá ưng ý',
    image: IMAGES.ImgShop, // Trỏ đến đúng ảnh
  },
  {
    id: 5,
    avt: IMAGES.GiatHap,
    name: 'Hà Thảo Nhi',
    rating: IMAGES.star,
    date: '28 tháng 6, 22:56',
    review: 'Giặt đồ thơm, ủi thẳng khá ưng ý',
    image: IMAGES.ImgShop, // Trỏ đến đúng ảnh
  },
  {
    id: 6,
    avt: IMAGES.GiatHap,
    name: 'Hà Thảo Nhi',
    rating: IMAGES.star,
    date: '28 tháng 6, 22:56',
    review: 'Giặt đồ thơm, ủi thẳng khá ưng ý',
    image: IMAGES.ImgShop, // Trỏ đến đúng ảnh
  },
  {
    id: 7,
    avt: IMAGES.GiatHap,
    name: 'Hà Thảo Nhi',
    rating: IMAGES.star,
    date: '28 tháng 6, 22:56',
    review: 'Giặt đồ thơm, ủi thẳng khá ưng ý',
    image: IMAGES.ImgShop, // Trỏ đến đúng ảnh
  },
];

// Hàm hiển thị từng phần tử đánh giá
const SeeReviewsScreen = ({navigation}: any) => {
  const renderItem = ({item}: any) => (
    <SectionComponent styles={{paddingHorizontal: 10, paddingVertical: 10}}>
      <RowComponent>
        <Image source={item.avt} style={styles.profileImage} />
        <SectionComponent styles={{flex: 1, marginTop: 20}}>
          <TextComponent
            text={item.name}
            color={COLORS.HEX_BLACK}
            font={FONTFAMILY.montserrat_bold}
            size={16}
          />
          <TextComponent
            text={item.date}
            color={COLORS.HEX_LIGHT_GRAY}
            size={12}
            styles={{marginTop: 4}}
          />
        </SectionComponent>
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={item.rating}
              style={[
                styles.star,
                {
                  tintColor:
                    index < 4 ? COLORS.HEX_YELLOW : COLORS.HEX_LIGHT_GREY,
                },
              ]}
            />
          ))}
        </View>
      </RowComponent>
      <TextComponent text={item.review} color={COLORS.HEX_BLACK} size={14} />
      <RowComponent styles={{marginTop: 10}}>
        <Image source={item.image} style={styles.image} />
        <SpaceComponent width={10} />
        <Image source={item.image} style={styles.image} />
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
      <SectionComponent styles={{marginTop: 20}}>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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

export default SeeReviewsScreen;
