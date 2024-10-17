import { View, Text, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserModel } from '../../../model/user_model';
import authenticationAPI from '../../../apis/authAPI';
import { ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../../components';
import COLORS from '../../../assets/colors/Colors';
import { ArrowLeft2, Verify } from 'iconsax-react-native';
import { FONTFAMILY } from '../../../../assets/fonts';

const DetailsShopScreen = ({navigation, route}: any) => {
    const {data} = route.params;
    const [details, setDetailShop] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    const getDataDetailShop = async () => {
        try {
            const res = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${data._id}`);
            const dataProduct:UserModel[] = res.data
            setDetailShop(dataProduct)
            setLoading(false);
        } catch (error) {
            console.log('Error fetching service types: ', error);
            setLoading(false);
        }
    };
  
    useEffect(() => {
        getDataDetailShop();
    }, []);
  return (
    <>
        {loading ? (
                <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} style={{marginTop:83}} />
            ) : (
                <ContainerComponent styleBackground={{backgroundColor:COLORS.WHISPER_GRAY}}>
                    <ImageBackground source={{uri:details[0].data_user.shop_banner}} style={{width:'100%', height:200}}>
                        <SectionComponent
                            styles={{
                            height: 83,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            }}>
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
                    
                </ContainerComponent>
            )}
    </>
  )
}

export default DetailsShopScreen