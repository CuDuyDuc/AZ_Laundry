import {
  AddSquare,
  ArrowDown2,
  ArrowRight2,
  ArrowUp2,
  Minus,
  Shop
} from 'iconsax-react-native'
import React, { useState } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FONTFAMILY } from '../../../../../assets/fonts'
import COLORS from '../../../../assets/colors/Colors'
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../../components'
import { useAxiosAddCart } from '../../../../hooks/useAxiosAddCart'
import { useRole } from '../../../../permission/permission'
import { authSelector } from '../../../../redux/reducers/authReducer'

const DetailProductService = ({ navigation, route }: any) => {
  const { data = {}, shopInfo = {} } = route.params || {}
  const [quantity, setQuantity] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const user = useSelector(authSelector)
  const { isUser } = useRole()

  const toggleDescription = () => setIsExpanded(!isExpanded)
  const handlePlus = () => setQuantity(prevQuantity => prevQuantity + 1)
  const handleMinus = () => {
    if (quantity > 1) setQuantity(prevQuantity => prevQuantity - 1)
  }

  const handleDetailsShopScreen = () => {

    navigation.navigate('DetailsShop', {
      data: data.id_user,
    })
  }

  return (
    <>
      <HeaderComponent
        title={data.product_name || 'Product Details'}
        isBack
        onBack={() => navigation.goBack()}
        onPress={() => navigation.navigate('Cart')}
      />
      <ContainerComponent isScroll>
        <ImageBackground
          style={{ width: '100%', height: 350, marginTop: 5 }}
          source={{ uri: data?.product_photo?.[0] || '' }}>
          <SectionComponent>
            <SpaceComponent height={10} />
            <RowComponent justify="space-between" styles={{ height: 40 }}>
              <TouchableOpacity
                onPress={handleDetailsShopScreen}
                style={{
                  backgroundColor: COLORS.AZURE_BLUE,
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  margin: 5,
                }}>
                <RowComponent styles={{alignItems:'center'}}>
                  <TextComponent
                    text={'Xem Shop'}
                    color={COLORS.WHITE}
                    font={FONTFAMILY.montserrat_medium}
                    styles={{marginRight: 5}}
                  />
                  <Shop size="25" color={COLORS.WHITE} />
                </RowComponent>
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
        </ImageBackground>

        <SectionComponent>
          <SpaceComponent height={10} />
          <RowComponent justify='space-between'>
            <TextComponent
              text={data?.product_name || 'Product Name'}
              color={COLORS.AZURE_BLUE}
              font={FONTFAMILY.montserrat_bold}
              size={18}
            />
            <TextComponent
              text={`${data?.product_price.toLocaleString('vi-VN') || 0} VNĐ`}
              color={COLORS.RED}
              font={FONTFAMILY.montserrat_medium}
              size={16}
            />
          </RowComponent>

        </SectionComponent>

        <SectionComponent>
          <RowComponent justify="flex-start" styles={{ marginTop: 10 }}>
            <TextComponent text="Mô tả" color={COLORS.DARK_BLUE} size={16} styles={{marginEnd: 8}}/>
            <TouchableOpacity onPress={toggleDescription}>
              {isExpanded ? (
                <ArrowUp2 size={24} color={COLORS.HEX_LIGHT_GREY} />
              ) : (
                <ArrowDown2 size={24} color={COLORS.HEX_LIGHT_GREY} />
              )}
            </TouchableOpacity>
          </RowComponent>
          <TextComponent
            text={
              isExpanded
                ? (data?.product_description || '')
                : `${(data?.product_description || '').slice(0, 100)}...`
            }
            color={COLORS.HEX_LIGHT_GREY}
            size={16}
            styles={{ marginTop: 5 , textAlign:'justify'}}
          />
        </SectionComponent>
      </ContainerComponent>

      <SectionComponent styles={{ paddingTop: 20, paddingBottom: 20, backgroundColor:COLORS.AZURE_BLUE, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
        <RowComponent justify="space-between">
          <TextComponent
            text={`${((data?.product_price || 0) * quantity).toLocaleString('vi-VN')} VNĐ`}
            color={COLORS.YELLOW}
            size={16}
            font={FONTFAMILY.montserrat_medium}
          />
          <RowComponent>
            <TouchableOpacity onPress={handleMinus}>
              <Minus size={30} variant="Bold" color={COLORS.WHITE} />
            </TouchableOpacity>
            <TextComponent
              text={quantity.toString()}
              color={COLORS.WHITE}
              font={FONTFAMILY.montserrat_medium}
              size={16}
              styles={{ marginHorizontal: 5 }}
            />
            <TouchableOpacity onPress={handlePlus}>
              <AddSquare size={30} variant="Bold" color={COLORS.WHITE} />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
        <SpaceComponent height={40} />
        {isUser ? (
          <ButtonComponent
            type="#00ADEF"
            text="Thêm vào giỏ hàng"
            styles={{backgroundColor: COLORS.WHITE}}
            textColor={COLORS.AZURE_BLUE}
            iconFlex='right'
            icon={<ArrowRight2 size="30" color={COLORS.AZURE_BLUE}/>}
            onPress={() =>
              useAxiosAddCart({
                id_product: data._id,
                id_user: user?.id,
                cart_subtotal: (data.product_price || 0) * quantity,
                product_quantity: quantity,
              })
            }
          />
        ) : (
          <View></View>
        )}
      </SectionComponent>
    </>
  )
}

export default DetailProductService