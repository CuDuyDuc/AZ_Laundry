import {
  AddSquare,
  ArrowDown2,
  ArrowUp2,
  Minus,
  Shop,
  ShoppingCart,
} from 'iconsax-react-native'
import React, {useEffect, useState} from 'react'
import {ImageBackground, TouchableOpacity, View} from 'react-native'
import {FONTFAMILY} from '../../../../../assets/fonts'
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
import {useAxiosAddCart} from '../../../../hooks/useAxiosAddCart'
import {useRole} from '../../../../permission/permission'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../../redux/reducers/authReducer'
import productAPI from '../../../../apis/productAPI'
import { ProductModel } from '../../../../model/product'
import authenticationAPI from '../../../../apis/authAPI'
import { UserModel } from '../../../../model/user_model'

const DetailProductService = ({navigation, route}: any) => {
  const { data = {}, shopInfo = {} } = route.params || {}
  const [quantity, setQuantity] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const user = useSelector(authSelector)
  const {isUser} = useRole()
  
  const toggleDescription = () => setIsExpanded(!isExpanded)
  const handlePlus = () => setQuantity(prevQuantity => prevQuantity + 1)
  const handleMinus = () => {
    if (quantity > 1) setQuantity(prevQuantity => prevQuantity - 1)
  }

  const handleDetailsShopScreen = () => {
    
    navigation.navigate('DetailsShop', { 
      data:  data.id_user ,
    })
  }
 
  return (
    <>
      <ContainerComponent>
        <HeaderComponent
          title={data.product_name || 'Product Details'}
          isBack
          onBack={() => navigation.goBack()}
        />
        <ImageBackground
          style={{width: '100%', height: 350, marginTop: 5}}
          source={{uri: data?.product_photo?.[0] || ''}}>
          <SectionComponent>
            <SpaceComponent height={10} />
            <RowComponent justify="flex-end" styles={{height: 40}}>
              <TouchableOpacity
                onPress={handleDetailsShopScreen}
                style={{
                  backgroundColor: COLORS.AZURE_BLUE,
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}>
                <RowComponent>
                  <TextComponent
                    text={'Xem Shop'}
                    color={COLORS.WHITE}
                    font={FONTFAMILY.montserrat_bold}
                  />
                  <Shop size="25" color={COLORS.WHITE} />
                </RowComponent>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <ShoppingCart
                  size={32}
                  color={COLORS.AZURE_BLUE}
                  variant="Bold"
                />
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
        </ImageBackground>

        <SectionComponent>
          <SpaceComponent height={10} />
          <TextComponent
            text={data?.product_name || 'Product Name'}
            color={COLORS.HEX_BLACK}
            size={13}
          />
          <TextComponent
            text={`${data?.product_price || 0} Đ/KG`}
            color={COLORS.RED}
            size={13}
          />
        </SectionComponent>

        <SectionComponent>
          <RowComponent justify="flex-start" styles={{marginTop: 10}}>
            <TextComponent text="Mô tả" color={COLORS.DARK_BLUE} size={13} />
            <TouchableOpacity onPress={toggleDescription}>
              {isExpanded ? (
                <ArrowUp2 size={13} color={COLORS.HEX_LIGHT_GREY} />
              ) : (
                <ArrowDown2 size={13} color={COLORS.HEX_LIGHT_GREY} />
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
            size={13}
            styles={{marginTop: 5}}
          />
        </SectionComponent>
      </ContainerComponent>

      <SectionComponent styles={{paddingTop: 20, paddingBottom: 20}}>
        <RowComponent justify="space-between">
          <TextComponent
            text={`${(data?.product_price || 0) * quantity}đ`}
            color={COLORS.RED}
            size={13}
            font={FONTFAMILY.montserrat_bold}
          />
          <RowComponent>
            <TouchableOpacity onPress={handleMinus}>
              <Minus size={25} variant="Bold" color={COLORS.AZURE_BLUE} />
            </TouchableOpacity>
            <TextComponent
              text={quantity.toString()}
              color={COLORS.GRAY_WHITE}
              font={FONTFAMILY.montserrat_medium}
              styles={{marginHorizontal: 5}}
            />
            <TouchableOpacity onPress={handlePlus}>
              <AddSquare size={25} variant="Bold" color={COLORS.AZURE_BLUE} />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
        <SpaceComponent height={40} />
        {isUser ? (
          <ButtonComponent
            type="#00ADEF"
            text="Thêm vào giỏ hàng"
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