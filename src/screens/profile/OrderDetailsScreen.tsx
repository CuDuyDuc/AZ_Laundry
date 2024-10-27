import { Button, Image, TouchableOpacity, View } from 'react-native';
import { ButtonComponent, CardOrderDetailComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import { FONTFAMILY } from '../../../assets/fonts';
import { ScrollView } from 'react-native-virtualized-view';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';

const OrderDetatailsScreen = ({ navigation }: any) => {

  const getProducts = () => {}

  return (
    <ContainerComponent isScroll >
      <HeaderComponent title='Chi tiết đơn hàng' isBack onBack={() => navigation.goBack()} />

      <SectionComponent>
        
        <RowComponent>
          <CardOrderDetailComponent
            id="1"
            productName="Áo sơ mi/ áo thun"
            status="Công nghệ giặt khô, làm sạch sâu các vết bẩn"
            price={59000}
            quantity={1}
            imageUrl={IMAGES.demoImage}
          />
        </RowComponent>

        <RowComponent justify="flex-start" styles={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
          <Image source={IMAGES.iconStatus} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <TextComponent text="Trạng thái đơn hàng" size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold}/>
            <RowComponent justify="flex-start" styles={{ marginTop: 5, alignItems: 'flex-start' }}>
              <TextComponent text="Thành công" size={14} color={COLORS.HEX_BLACK} styles={{ width: 100 }} />
            </RowComponent>
          </View>
        </RowComponent>

        <RowComponent justify="center" styles={{marginBottom: 5, marginTop: 5}}>
          <Image source={IMAGES.line}/>
        </RowComponent>
        
        <RowComponent justify="flex-start" styles={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
          <Image source={IMAGES.iconadress} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <TextComponent text="Địa chỉ nhận hàng" size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold}/>
            <RowComponent justify="flex-start" styles={{ marginTop: 5, alignItems: 'flex-start' }}>
              <TextComponent text="Địa chỉ" size={14} color={COLORS.HEX_BLACK} styles={{ width: 60 }} />
              <TextComponent
                text="Số 10 Phạm Văn Đồng, thị trấn Núi Thành, Quảng Nam Số 10 Phạm Văn Đồng, thị trấn Núi Thành, Quảng Nam Số 10 Phạm Văn Đồng, thị trấn Núi Thành, Quảng Nam Số 10 Phạm Văn Đồng, thị trấn Núi Thành, Quảng Nam"
                size={15}
                color={COLORS.HEX_BLACK}
                font={FONTFAMILY.montserrat_medium}
                styles={{ flex: 1, flexWrap: 'wrap', marginLeft: 10 }}
              />
            </RowComponent>
          </View>
        </RowComponent>

        <RowComponent justify="center" styles={{marginBottom: 5, marginTop: 5}}>
          <Image source={IMAGES.line}/>
        </RowComponent>

        <RowComponent justify="flex-start" styles={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
          <Image source={IMAGES.iconpayment} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <TextComponent text="Phương thức thanh toán" size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold}/>
            <RowComponent justify="flex-start" styles={{ marginTop: 5, alignItems: 'flex-start' }}>
              <TextComponent text="Thanh toán khi nhận hàng" size={14} color={COLORS.HEX_BLACK} styles={{ width: 200 }} />
            </RowComponent>
          </View>
        </RowComponent>

        <SectionComponent>
          <TextComponent text='Chi tiết đơn hàng' size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold}/>
          <SectionComponent styles={{backgroundColor: COLORS.WHITE, padding: 20, borderRadius: 5 }}>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
              <TextComponent text="Mã đơn hàng" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text="#789016" size={16} color={COLORS.HEX_BLACK} />
            </RowComponent>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15  }}>
              <TextComponent text="Giao hàng" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text="10.000đ" size={16} color={COLORS.HEX_BLACK} />
            </RowComponent>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15  }}>
              <TextComponent text="Giảm giá" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text="10.000đ" size={16} color={COLORS.HEX_BLACK} />
            </RowComponent>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15  }}>
              <TextComponent text="Tổng tiền" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text="20.000đ" size={18} color={COLORS.RED} />
            </RowComponent>
          </SectionComponent>
        </SectionComponent>

        <RowComponent justify='center'>
          <ButtonComponent
            text="Hủy đơn"
            type="#00ADEF"
            textColor={COLORS.AZURE_BLUE}
            textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
            styles={{
              width: "50%",
              marginRight: 10,
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.AZURE_BLUE,
              borderWidth: 1
            }} />
        </RowComponent>


      </SectionComponent>

    </ContainerComponent>
  );
};

export default OrderDetatailsScreen;