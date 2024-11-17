import React, { useEffect, useState } from 'react';
import { ButtonComponent, CardOrderDetailComponent, ContainerComponent, HeaderComponent, InputComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import IMAGES from '../../assets/images/Images';
import { Alert, Image, TextInputComponent, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import reviewAPI from '../../apis/reviewAPI';
import { PaymentModel } from '../../model/payment_model';
import paymentAPI from '../../apis/paymentAPI';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const ReviewProductsScreen = ({ navigation, route }: any) => {

    const [payment, setPayment] = useState<PaymentModel[]>([]);
    const { paymentId } = route.params;
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [files, setFiles] = useState<{ uri: string | undefined; type: string | undefined; name: string | undefined; }[]>([]);

    const totalProducts = payment.length > 0 && Array.isArray(payment[0].id_cart)
        ? payment[0].id_cart.length
        : 0;

    const handleAddFile = async (type: string) => {
        try {
            const options = {
                mediaType: type as 'photo' | 'video', // 'photo' hoặc 'video'
                selectionLimit: 1,
            };

            const result = await launchImageLibrary(options);

            if (result.assets && result.assets.length > 0) {
                const newFile = {
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                    name: result.assets[0].fileName,
                };

                setFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } catch (error) {
            console.log('Error adding file:', error);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const getDataPayment = async () => {
        try {
            const res: any = await paymentAPI.HandlePayment(`/get-order-by-id/${paymentId}`);
            const data = res.data;
            setPayment([data]);
            console.log('Payment data review:', data);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const addReview = async () => {
        try {
            const reviewData = {
                orderId: paymentId,
                rating,
                comment,
                files
            };
            const res = await reviewAPI.HandleReview('/add-review', reviewData, 'post');
            console.log('Review added successfully:', res.data);
            Alert.alert('Thành công', 'Đánh giá đã được thêm.', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error: any) {
            console.log('Error adding review:', error);
        }
    };

    useEffect(() => {
        getDataPayment();
    }, []);

    return (
        <ContainerComponent>
            <HeaderComponent title="Đánh giá đơn hàng" isBack onBack={() => navigation.goBack()} />

            <SectionComponent>
                <RowComponent justify='center' styles={{ marginTop: 30 }}>
                    <TextComponent text={'Thêm đánh giá sản phẩm mua hàng từ shop'} color={COLORS.ORANGE} size={13} font='Nunito' styles={{ fontStyle: 'italic' }} />
                </RowComponent>
                <RowComponent justify='center' styles={{ marginTop: 5 }}>
                    <TextComponent text={'để shop hoàn thiện hơn mỗi ngày. Cảm ơn bạn đã đồng hành cùng shop!'} color={COLORS.ORANGE} size={13} font='Nunito' styles={{ fontStyle: 'italic' }} />
                </RowComponent>
            </SectionComponent>

            <SectionComponent>
                <RowComponent styles={{ marginBottom: 15 }}>
                    <TextComponent text={`Sản phẩm(${totalProducts})`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
                </RowComponent>
                <RowComponent styles={{ marginBottom: 15 }}>
                    <Image source={IMAGES.iconshop} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
                    <TextComponent text={'Cửa hàng giặt sấy Minh Đức'} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
                </RowComponent>
                <FlatList
                    data={payment}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 8 }}>
                                {/* Hiển thị danh sách sản phẩm trong id_cart */}
                                <FlatList
                                    data={Array.isArray(item.id_cart) ? item.id_cart : []} // Duyệt qua từng giỏ hàng (cart) trong đơn hàng
                                    keyExtractor={(cartItem) => cartItem._id.toString()}
                                    renderItem={({ item: cartItem }) => (
                                        <CardOrderDetailComponent
                                            imageUrl={cartItem.id_product.product_photo[0]}
                                            productName={cartItem.id_product.product_name}
                                            short_description={cartItem.id_product.short_description}
                                            price={cartItem.cart_subtotal}
                                        />
                                    )}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SectionComponent>

            <SectionComponent>
                <RowComponent>
                    <ButtonComponent
                        text="Thêm hình ảnh"
                        icon={<Image source={IMAGES.camera_alt} style={{ width: 20, height: 20 }} />}
                        iconFlex="left"
                        type="#00ADEF"
                        textColor={COLORS.AZURE_BLUE}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        styles={{
                            width: "50%",
                            marginRight: 10,
                            backgroundColor: COLORS.HEX_GRAY,
                            borderColor: COLORS.AZURE_BLUE,
                            borderWidth: 1,
                            borderRadius: 1,
                        }}
                        onPress={() => handleAddFile('photo')}
                    />
                    <ButtonComponent
                        text="Thêm video"
                        icon={<Image source={IMAGES.photo_camera} style={{ width: 20, height: 20 }} />}
                        iconFlex="left"
                        type="#00ADEF"
                        textColor={COLORS.AZURE_BLUE}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        styles={{
                            width: "50%",
                            marginRight: 10,
                            backgroundColor: COLORS.HEX_GRAY,
                            borderColor: COLORS.AZURE_BLUE,
                            borderWidth: 1,
                            borderRadius: 1
                        }}
                        onPress={() => handleAddFile('video')}
                    />
                </RowComponent>

                <RowComponent styles={{ marginTop: 10, flexWrap: 'wrap' }}>
                    {files.map((file, index) => (
                        <View key={index} style={{ margin: 5 }}>
                            <TouchableOpacity onPress={() => handleRemoveFile(index)} style={{ position: 'relative' }}>
                                <Image
                                    source={{ uri: file.uri }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: COLORS.GRAY,
                                    }}
                                />
                                {/* Nút xóa tệp */}
                                <View style={{
                                    position: 'absolute',
                                    top: -5,
                                    right: -5,
                                    backgroundColor: COLORS.RED,
                                    borderRadius: 15,
                                    width: 20,
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <TextComponent
                                        text="X"
                                        color={COLORS.WHITE}
                                        size={12}
                                        font={FONTFAMILY.montserrat_bold}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </RowComponent>

            </SectionComponent>

            <RowComponent justify="center" styles={{ marginVertical: 20 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Image
                            source={star <= rating ? IMAGES.star1 : IMAGES.star2}
                            style={{ marginHorizontal: 5 }}
                        />
                    </TouchableOpacity>
                ))}
            </RowComponent>

            <SectionComponent>
                <InputComponent
                    value={comment}
                    onChange={(val) => setComment(val)}
                    allowClear
                    placeholder="Hãy chia sẻ những điều bạn thích ở sản phẩm này nhé"
                    style={{
                        borderColor: COLORS.WHITE,
                        backgroundColor: COLORS.WHITE,
                        borderRadius: 5,
                        height: 200,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                    multiline={true}
                    numberOfLines={5}
                />
            </SectionComponent>

            <SectionComponent>
                <RowComponent>
                    <ButtonComponent
                        text="Đánh giá"
                        type="#00ADEF"
                        styles={{ width: "100%" }}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        onPress={addReview}
                    />
                </RowComponent>
            </SectionComponent>

        </ContainerComponent>
    );
};

export default ReviewProductsScreen;