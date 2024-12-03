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
import { useChatContext } from '../../../context/ChatContext';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../redux/reducers/authReducer';
import chatAPI from '../../../apis/chatAPI';
import IMAGES from '../../../assets/images/Images';
import { useRole } from '../../../permission/permission';

const DetailsShopScreen = ({ navigation, route }: any) => {
    const { data } = route.params;
    const { isUser } = useRole()
    const [details, setDetailShop] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductModel[]>([])
    const { createChat, notifications, allUsers,markNotificationAsRead,userChats,updateCurrentChat} =useChatContext();
    const user = useSelector(authSelector);
    const [chat,setChats]= useState<any>([])
    const getDataDetailShop = async () => {
        try {
            const res: any = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${data._id}`);
            const dataShop: UserModel[] = res
            setDetailShop(dataShop)
            setLoading(false);
        } catch (error) {
            console.log('Error fetching shop: ', error);
            setLoading(false);
        }
    };
    const getChats = async()=>{
        try {
            const res: any = await chatAPI.HandleChat(`/find-chat/${user.id}/${data._id}`) ;
            setChats(res[0])
            setLoading(false);
        } catch (error) {
            console.log('Error fetching shop: ', error);
            setLoading(false);
        }
    }
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

    const getDataProducts = async () => {
        try {
            const res = await productAPI.HandleProduct(`/get-product-by-id?id_user=${data._id}`);
            const dataProduct: ProductModel[] = res.data
            setProducts(dataProduct)
        } catch (error) {
            console.log('Error fetching product: ', error);
        }
    }

    useEffect(() => {
        getDataDetailShop();
        getChats();
    }, []);
    const HandleChatBox=async()=>{
        let currentChat = chat;
        if(!chat){
            const newchat=await createChat(user.id, data._id)
            if(newchat){
                setChats(newchat)
                currentChat = newchat
            }
            
        }
        await getChats();
        const modifiedNotifications= notifications?.map((n:any) => {
            const sender =allUsers?.find((user:any) => user.id===n.senderId);
                return {
                    ...n, 
                    senderName: sender?.fullname,
                };
        })
        if(modifiedNotifications||notifications){
            const matchedNotification = modifiedNotifications?.find((n: any) => {
                return currentChat?.members?.includes(n?.senderId)
        });
            if(matchedNotification){
                markNotificationAsRead({ n: matchedNotification,userChats,user,notifications})
            }
        }
        
        await updateCurrentChat(currentChat);
        navigation.navigate('ChatScreen');
    }
    useEffect(() => {
        getDataProducts();
    }, [data._id]);
    const handleDetailProduct = (item: any) => {
        navigation.navigate('DetailProductService', {data: item});
    };
    return (
        <>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} style={{ marginTop: 83 }} />
            ) : (
                <View style={{ backgroundColor: COLORS.WHISPER_GRAY, position: 'relative', flex: 1 }}>
                    <ImageBackground source={details[0]?{ uri: details[0]?.data_user.shop_banner }:IMAGES.BackGroundShop} style={{ width: '100%', height: 200 }}>
                        <SectionComponent styles={{ height: 83, flexDirection: 'column', justifyContent: 'center', }}>
                            <RowComponent styles={{ marginTop: 35 }} justify="flex-start">
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <ArrowLeft2 size="30" color={COLORS.WHITE} />
                                </TouchableOpacity>
                            </RowComponent>
                        </SectionComponent>
                    </ImageBackground>
                    <SectionComponent styles={{ backgroundColor: COLORS.WHITE, marginHorizontal: 40, borderRadius: 25, position: 'absolute', top: 120, left: 0, right: 0 }}>
                        <RowComponent justify='center' styles={{ marginVertical: 8 }}>
                            <Verify size="30" color={COLORS.TEAL} variant='Bold' />
                            <TextComponent text={details[0]?.data_user.shop_name} color={COLORS.DARK_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                        </RowComponent>
                        <TextComponent text={`Địa chỉ: ${details[0]?.address}.`} color={COLORS.GRAY_WHITE} size={12} />
                        <TextComponent text={'Giặt khô, đảm bảo trước khi giao cho khách.'} color={COLORS.HEX_BLACK} size={12} styles={{ marginVertical: 8 }} />
                        <TextComponent text={'Ủi thẳng, xả cực thơm.'} color={COLORS.HEX_BLACK} size={12} />
                        <TextComponent text={'99% khách hàng hài lòng về dịch vụ.'} color={COLORS.HEX_BLACK} size={12} styles={{ marginVertical: 8 }} />
                    </SectionComponent>
                    <SectionComponent styles={{ position: 'relative', top: 120 }}>
                        <RowComponent justify='space-between' >
                            <RowComponent>
                                <Star1 size={18} variant="Bold" color={COLORS.YELLOW} />
                                <TextComponent styles={{ marginLeft: 5 }} text={details[0]?.data_user.star_rating} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} size={13} />
                            </RowComponent>
                            <RowComponent>
                                <ArchiveAdd size={18} color={COLORS.GRAY_WHITE} />
                                <TextComponent styles={{ marginLeft: 5 }} text={details[0]?.data_user.order_count} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} size={13} />
                            </RowComponent>
                            <ButtonComponent type='link' text='Xem đánh giá' color={COLORS.AZURE_BLUE} onPress={() => { navigation.navigate("SeeReviewsScreen", { id_shop: data._id.toString() })}} />
                        </RowComponent>
                    </SectionComponent>
                    <SectionComponent styles={{ position: 'relative', top: 120, paddingBottom: isUser?520:400 }}>
                        <CardProductComponent onPress={handleDetailProduct} groupProductsByServiceType={groupProductsByServiceType(products)} />
                    </SectionComponent>
                    {isUser?(
                        <View style={{ backgroundColor: COLORS.WHITE, position: 'absolute', bottom: 0, left: 0, right: 0, paddingTop: 15 }}>
                            <SectionComponent styles={{ justifyContent: 'flex-start' }}>
                                <TouchableOpacity onPress={HandleChatBox}>
                                    <RowComponent>
                                        <Message size={18} variant='Bold' color={COLORS.AZURE_BLUE} />
                                        <TextComponent styles={{ marginLeft: 5 }} text={'Hỗ trợ khách hàng'} color={COLORS.AZURE_BLUE} font={FONTFAMILY.montserrat_bold} size={13} />
                                    </RowComponent>
                                </TouchableOpacity>
                            </SectionComponent>
                            <SectionComponent>
                                <RowComponent justify='space-between'>
                                    <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
                                        <ShoppingCart size={40} color={COLORS.AZURE_BLUE} />
                                    </TouchableOpacity>
                                    <ButtonComponent styles={{ width: '80%' }} type='#00ADEF' text='Đến trang thanh toán' />
                                </RowComponent>
                            </SectionComponent>
                        </View>
                    ):undefined}
                </View>
            )}
        </>
    )
}

export default DetailsShopScreen