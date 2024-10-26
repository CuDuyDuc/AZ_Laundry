import { ArchiveAdd, ArrowLeft2, Message, ShoppingCart, Star1, Verify } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../../assets/fonts';
import authenticationAPI from '../../../apis/authAPI';
import productAPI from '../../../apis/productAPI';
import COLORS from '../../../assets/colors/Colors';
import { ButtonComponent, CardProductComponent, RowComponent, SectionComponent, TextComponent } from '../../../components';
import { ProductModel } from '../../../model/product';
import { UserModel } from '../../../model/user_model';

const DetailsShopScreen = ({navigation, route}: any) => {
    const {data} = route.params;
    const [details, setDetailShop] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [products,setProducts]= useState<ProductModel[]>([])
    const getDataDetailShop = async () => {
        try {
            const res:any = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${data._id}`);
            const dataShop:UserModel[] = res
            setDetailShop(dataShop)
            setLoading(false);
        } catch (error) {
            console.log('Error fetching shop: ', error);
            setLoading(false);
        }
    };
  
    const groupProductsByServiceType = (products: ProductModel[]) => {
        const groupedData: { [key: string]: ProductModel[] } = {};
      
        products.forEach((product) => {
          const serviceTypeName = product.id_product_type.id_service_type.service_type_name;
      
          if (!groupedData[serviceTypeName]) {
            groupedData[serviceTypeName] = [];
          }
      
          groupedData[serviceTypeName].push(product);
        });
      
        return groupedData;
      };
    const getDataProducts = async()=>{
        try {
            const res = await productAPI.HandleProduct(`/get-product-by-id?id_user=${data._id}`);
            const dataProduct:ProductModel[] = res.data
            setProducts(dataProduct)
        } catch (error) {
            console.log('Error fetching product: ', error);
        }
    }
    
    useEffect(() => {
        getDataDetailShop();
    }, []);
    useEffect(() => {
        getDataProducts();
    }, []);
    
  return (
    <>
        {loading ? (
            <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} style={{marginTop:83}} />
        ) : (
            <View style={{backgroundColor:COLORS.WHISPER_GRAY,position:'relative', flex:1}}>
                <ImageBackground source={{uri:details[0].data_user.shop_banner}} style={{width:'100%', height:200}}>
                    <SectionComponent styles={{height: 83,flexDirection: 'column',justifyContent: 'center',}}>
                        <RowComponent styles={{marginTop: 35}} justify="flex-start">
                                <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <ArrowLeft2 size="30" color={COLORS.WHITE} />
                            </TouchableOpacity>
                        </RowComponent>
                    </SectionComponent>
                </ImageBackground>
                <SectionComponent styles={{backgroundColor:COLORS.WHITE,marginHorizontal:40, borderRadius:25,position:'absolute',top:120,left:0,right:0}}>
                    <RowComponent justify='center' styles={{marginVertical:8}}>
                        <Verify size="30" color={COLORS.TEAL} variant='Bold' />
                        <TextComponent text={details[0].data_user.shop_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                    </RowComponent>
                    <TextComponent text={`Địa chỉ: ${details[0].address}.`} color={COLORS.GRAY_WHITE} size={12}/>
                    <TextComponent text={'Giặt khô, đảm bảo trước khi giao cho khách.'} color={COLORS.HEX_BLACK} size={12} styles={{marginVertical:8}}/>
                    <TextComponent text={'Ủi thẳng, xả cực thơm.'} color={COLORS.HEX_BLACK} size={12}/>
                    <TextComponent text={'99% khách hàng hài lòng về dịch vụ.'} color={COLORS.HEX_BLACK} size={12} styles={{marginVertical:8}}/>
                </SectionComponent>
                <SectionComponent styles={{position:'relative', top:120}}>
                    <RowComponent justify='space-between' >
                        <RowComponent>
                            <Star1 size={18} variant="Bold" color={COLORS.YELLOW} />
                            <TextComponent styles={{ marginLeft: 5 }} text={details[0].data_user.star_rating} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} size={13} />
                        </RowComponent>
                        <RowComponent>
                            <ArchiveAdd size={18} color={COLORS.GRAY_WHITE} />
                            <TextComponent styles={{ marginLeft: 5 }} text={details[0].data_user.order_count} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} size={13} />
                        </RowComponent>
                        <ButtonComponent type='link' text='Xem đánh giá' color={COLORS.AZURE_BLUE}  onPress={() => {
                            navigation.navigate('SeeReviews')
                        }}/> 
                    </RowComponent>
                </SectionComponent>
                <SectionComponent styles={{position:'relative', top:120,paddingBottom:520}}>
                    <CardProductComponent groupProductsByServiceType={groupProductsByServiceType(products)}/>
                </SectionComponent>
                <View style={{backgroundColor:COLORS.WHITE, position:'absolute', bottom:0, left:0, right:0, paddingTop:15}}>
                   <SectionComponent>
                        <RowComponent justify='space-between'>
                            <RowComponent>
                                <Message size={18} variant='Bold' color={COLORS.AZURE_BLUE} />
                                <TextComponent styles={{ marginLeft: 5 }} text={'Hỗ trợ khách hàng'} color={COLORS.AZURE_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                            </RowComponent>
                            <ButtonComponent type='link' text='Chat với chúng tôi'/>
                        </RowComponent>
                   </SectionComponent>
                   <SectionComponent>
                        <RowComponent justify='space-between'>
                            <TouchableOpacity onPress={()=>navigation.navigate('Cart')} >
                                <ShoppingCart size={40}  color={COLORS.AZURE_BLUE} />
                            </TouchableOpacity>
                            <ButtonComponent styles={{width:'80%'}} type='#00ADEF' text='Đến trang thanh toán'/>
                        </RowComponent>
                   </SectionComponent>
                </View>
            </View>
        )}
    </>
  )
}

export default DetailsShopScreen