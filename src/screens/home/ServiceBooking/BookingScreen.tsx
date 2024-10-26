import {Cd, ArrowRight2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTFAMILY} from '../../../../assets/fonts';
import COLORS from '../../../assets/colors/Colors';
import IMAGES from '../../../assets/images/Images';
import {
  AccountComponent,
  ButtonComponent,
  CheckBoxComponent,
  ContainerComponent,
  HeaderComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';

const Data = [
  {
    id: 1,
    image: IMAGES.Rectangle,
    title: 'Giặt ủi thông thường',
    price: '12.000/kg',
    Address:
      'Địa chỉ: Lô 13A, Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng (1.2km)',
  },
];

const BookingScreen = ({navigation}: any) => {
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedShipOption, setSelectedShipOption] = useState('');
  const [notes, setNotes] = useState('');

  const renderItem = ({item}: any) => (
    <ContainerComponent>
      <RowComponent>
        <Image source={item.image} style={styles.image} />
        <SectionComponent styles={{flex: 1, marginTop: 20}}>
          <TextComponent text={item.title} color={COLORS.HEX_BLACK} size={14} />
          <TextComponent
            text={item.price}
            color={COLORS.AZURE_BLUE}
            size={12}
            styles={{marginTop: 4}}
          />
          <TextComponent
            text={item.Address}
            color={COLORS.HEX_LIGHT_GREY}
            size={10}
          />
        </SectionComponent>
      </RowComponent>
    </ContainerComponent>
  );

  return (
    <ContainerComponent>
      <HeaderComponent
        title="Đặt lịch"
        isBack
        onBack={() => navigation.goBack()}
      />
      <SpaceComponent height={10} />
      <SectionComponent>
        <TextComponent
          text={'Thông tin dịch vụ'}
          color={COLORS.HEX_BLACK}
          size={14}
          font={FONTFAMILY.montserrat_bold}
        />
        <FlatList
          style={{backgroundColor: COLORS.WHITE}}
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity>
          <RowComponent
            justify="space-between"
            styles={{backgroundColor: COLORS.WHITE, padding: 10}}>
            <TextComponent
              text="Chọn thời gian nhận đồ"
              color={COLORS.HEX_LIGHT_GREY}
              size={14}
            />
            <ArrowRight2 size={28} color={COLORS.HEX_LIGHT_GREY} />
          </RowComponent>
        </TouchableOpacity>
      </SectionComponent>

      <SectionComponent>
        <TextComponent
          text="Phân loại sản phẩm"
          color={COLORS.HEX_BLACK}
          size={14}
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="flex-start">
          <TouchableOpacity onPress={() => setSelectedProductType('wet')}>
            <CheckBoxComponent
              icon={
                <Cd
                  size="18"
                  color={
                    selectedProductType === 'wet'
                      ? COLORS.AZURE_BLUE
                      : COLORS.HEX_LIGHT_GREY
                  }
                />
              }
              title="Sản phẩm dạng ướt"
            />
          </TouchableOpacity>
          <SpaceComponent width={30} />
          <TouchableOpacity onPress={() => setSelectedProductType('dry')}>
            <CheckBoxComponent
              icon={
                <Cd
                  size="18"
                  color={
                    selectedProductType === 'dry'
                      ? COLORS.AZURE_BLUE
                      : COLORS.HEX_LIGHT_GREY
                  }
                />
              }
              title="Sản phẩm dạng khô"
            />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>

      <SectionComponent>
        <TextComponent text="Đầu ship" color={COLORS.HEX_BLACK} size={14} />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="flex-start">
          <TouchableOpacity onPress={() => setSelectedShipOption('oneway')}>
            <CheckBoxComponent
              icon={
                <Cd
                  size="18"
                  color={
                    selectedShipOption === 'oneway'
                      ? COLORS.AZURE_BLUE
                      : COLORS.HEX_LIGHT_GREY
                  }
                />
              }
              title="Ship 1 chiều"
            />
          </TouchableOpacity>
          <SpaceComponent width={85} />

          <TouchableOpacity onPress={() => setSelectedShipOption('roundtrip')}>
            <CheckBoxComponent
              icon={
                <Cd
                  size="18"
                  color={
                    selectedShipOption === 'roundtrip'
                      ? COLORS.AZURE_BLUE
                      : COLORS.HEX_LIGHT_GREY
                  }
                />
              }
              title="Ship 2 chiều"
            />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Ghi chú" color={COLORS.HEX_BLACK} size={14} />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder="Nhập ghi chú"
          value={notes}
          onChange={setNotes}
          multiline={true}
          numberOfLines={6}
          backgroundColor={COLORS.WHITE}
        />
      </SectionComponent>

      <SpaceComponent height={120} />
      <SectionComponent>
        <TextComponent
          text={
            'Lưu ý: Thời gian dự kiến nhận hàng sau 24h kể từ lúc cửa hàng nhận hàng từ khách hàng'
          }
          color={COLORS.RED}
          size={12}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent type="#00ADEF" text="Tiêp theo" />
      </SectionComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  nextButton: {
    backgroundColor: COLORS.AZURE_BLUE,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default BookingScreen;
