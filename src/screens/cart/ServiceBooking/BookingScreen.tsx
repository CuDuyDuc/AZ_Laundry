import {Cd, ArrowRight2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {FONTFAMILY} from '../../../../assets/fonts';
import COLORS from '../../../assets/colors/Colors';
import IMAGES from '../../../assets/images/Images';
import {
  AccountComponent,
  BottomSheetComponent,
  ButtonComponent,
  CheckBoxComponent,
  ContainerComponent,
  HeaderComponent,
  InputComponent,
  KeyboardAvoidingViewWrapper,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import moment from 'moment';

const Data = [
  {
    id: 1,
    image: IMAGES.ImgShop,
    title: 'Giặt ủi thông thường',
    price: '12.000/kg',
    Address:
      'Địa chỉ: Lô 13A, Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng (1.2km)',
  },
];

const BookingScreen = ({navigation, route}: any) => {
  const {sendDate, receiveDate, sendTime, receiveTime} = route.params || {};
  const [selectedProductType, setSelectedProductType] = useState('wet');
  const [selectedShipOption, setSelectedShipOption] = useState('oneway');

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
    <>
      <KeyboardAvoidingViewWrapper>
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
            scrollEnabled={false}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DateWeek');
            }}>
            <RowComponent
              justify="space-between"
              styles={{backgroundColor: COLORS.WHITE, paddingVertical: 8, borderRadius: 16}}>
              <TextComponent
                text="Chọn thời gian nhận đồ"
                color={COLORS.HEX_LIGHT_GREY}
                size={14}
              />
              <ArrowRight2 size={28} color={COLORS.HEX_LIGHT_GREY} />
            </RowComponent>
          </TouchableOpacity>
          <SectionComponent styles= {{paddingHorizontal: 0}}>
            <SpaceComponent height={10} />
            <RowComponent justify="space-between">
              <TextComponent text={`Giờ gửi: ${sendTime}`} color={COLORS.AZURE_BLUE} size={14}/>
              <TextComponent text={`Ngày gửi: ${moment(sendDate).format('DD-MM-YYYY')}`} color={COLORS.AZURE_BLUE} size={14}/>
            </RowComponent>
            <RowComponent justify="space-between">
              <TextComponent text={`Giờ nhận: ${receiveTime}`} color={COLORS.AZURE_BLUE} size={14}/>
              <TextComponent text={`Ngày gửi: ${moment(receiveDate).format('DD-MM-YYYY')}`} color={COLORS.AZURE_BLUE} size={14}/>
            </RowComponent>
          </SectionComponent>
          <TextComponent
            text="Phân loại sản phẩm"
            color={COLORS.HEX_BLACK}
            size={14}
          />
        </SectionComponent>
        <SectionComponent>
          <RowComponent justify="space-between">
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
          <RowComponent justify="space-between">
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
            <TouchableOpacity
              onPress={() => setSelectedShipOption('roundtrip')}>
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
          <TextInput 
            placeholder='Nhập ghi chú'
            value={notes}
            onChangeText={setNotes}
            multiline = {true}
            numberOfLines={8}
            style = {{
              backgroundColor: COLORS.WHITE, 
              textAlignVertical: 'top',
              paddingHorizontal: 20,
              paddingTop: 10, 
              paddingBottom: 0, 
              borderRadius: 16,}}/>
        </SectionComponent>
      </KeyboardAvoidingViewWrapper>
      <SectionComponent>
        <TextComponent
          text={
            'Lưu ý: Thời gian dự kiến nhận hàng sau 24h kể từ lúc cửa hàng nhận hàng từ khách hàng'
          }
          color={COLORS.RED}
          size={12}
        />
        <SpaceComponent height={20} />
        <ButtonComponent type="#00ADEF" text="Tiếp theo" />
      </SectionComponent>
    </>
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
