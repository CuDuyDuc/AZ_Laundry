import React, { useState } from 'react';
import { ActivityIndicator, StatusBar, Switch, TouchableOpacity } from 'react-native';
import { ButtonComponent, HeaderComponent, InputComponent, KeyboardAvoidingViewWrapper, PickerComponent, RowComponent, SectionComponent, TextComponent } from '../../../../../../components';
import COLORS from '../../../../../../assets/colors/Colors';
import { FONTFAMILY } from '../../../../../../../assets/fonts';
import { useGetThirdPartyAPI } from '../../../../../../hooks/useGetThirdPartyAPI';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../../../redux/reducers/authReducer';
import authenticationAPI from '../../../../../../apis/authAPI';
import * as Burnt from "burnt";

const Manage_Address = ({navigation}: any) => {
    const user = useSelector(authSelector)
    const [fullname, setFullname]= useState('')
    const [loadingButton, setLoadingButton] = useState<boolean>(false);

    const [specificAddress, setSpecificAddress]= useState('')
    const [phoneNumber, setPhoneNumber]= useState('')
    const {valueLocation: provinceData} = useGetThirdPartyAPI(1, 0);
    const [selectedValueProvince, setSelectedValueProvince] = useState<any>({});
    const {valueLocation: districtData} = useGetThirdPartyAPI(
        2,
        selectedValueProvince?.id,
    );
    const [selectedValueDistrict, setSelectedValueDistrict] = useState<any>({});
    const {valueLocation: wardData} = useGetThirdPartyAPI(
        3,
        selectedValueDistrict?.id,
    );
    const [selectedValueWard, setSelectedValueWard] = useState<any>({});
    const HandleGetProvince = (data: any) => {
        setSelectedValueProvince(data);
    };
    const HandleGetDistrict = (data: any) => {
        setSelectedValueDistrict(data);
    };
    const HandleGetWard = (data: any) => {
        setSelectedValueWard(data);
    };
    const HandleAddAddressByUser = async()=>{
        if (!fullname || !specificAddress || !phoneNumber) {
            Burnt.toast({
                title: "Vui lòng điền đầy đủ thông tin!",
            });
            return; // Dừng lại nếu không có đủ thông tin
        }
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            Burnt.toast({
                title: "Số điện thoại không hợp lệ! Số điện thoại phải đủ 10 số và bắt đầu bằng 0.",
            });
            return; // Dừng lại nếu số điện thoại không hợp lệ
        }
        setLoadingButton(true);
        const address =`${specificAddress}, ${selectedValueWard?.full_name}, ${selectedValueDistrict?.full_name}, ${selectedValueProvince?.full_name}`
        try {
            const respones = await authenticationAPI.HandleAuthentication('/add-address-by-id-user',{
                id_user:user.id,
                full_name:fullname,
                phone_number:phoneNumber,
                address:address
            },'post')
            if(respones){
                Burnt.toast({
                    title: "Thêm thành công",

                });
                setLoadingButton(false);

            }else{
                setLoadingButton(false);

            }
            navigation.navigate('AddressSelectionScreen')
        } catch (error) {
            setLoadingButton(false);
            console.log(error);

        }
    }
    const [isRemember, setIsRemember] = useState(true);
    return (
        <KeyboardAvoidingViewWrapper >
            <StatusBar barStyle={'light-content'}/>
            <HeaderComponent 
                isBack 
                onBack={() => navigation.goBack()} 
                title='Thêm địa chỉ'/>
            <SectionComponent styles={{marginTop:10}}>
                <TextComponent 
                    text={'Tỉnh / TP'} 
                    color={COLORS.HEX_BLACK} 
                    size={14} 
                    font={FONTFAMILY.montserrat_bold}/>
                <PickerComponent
                    dataLocation={provinceData}
                    onDataLocation={HandleGetProvince}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent 
                    text={'Quận / Huyện'} 
                    color={COLORS.HEX_BLACK} 
                    size={14} 
                    font={FONTFAMILY.montserrat_bold}/>
                <PickerComponent
                    dataLocation={districtData}
                    onDataLocation={HandleGetDistrict}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent 
                    text={'Phường / Xã'} 
                    color={COLORS.HEX_BLACK} 
                    size={14} 
                    font={FONTFAMILY.montserrat_bold}/>
                <PickerComponent
                    dataLocation={wardData}
                    onDataLocation={HandleGetWard}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent 
                    text={'Địa chỉ cụ thể'} 
                    color={COLORS.HEX_BLACK} 
                    size={14} 
                    font={FONTFAMILY.montserrat_bold}/>
                <InputComponent 
                    placeholder='102 Hoài Thanh'
                    allowClear
                    value={specificAddress}
                    backgroundColor={COLORS.WHITE}
                    onChange={val=>setSpecificAddress(val)}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent 
                    text={'Họ tên người nhận'} 
                    color={COLORS.HEX_BLACK} 
                    size={14} 
                    font={FONTFAMILY.montserrat_bold}/>
                <InputComponent 
                    placeholder='Nhập họ và tên'
                    allowClear
                    value={fullname}
                    backgroundColor={COLORS.WHITE}
                    onChange={val=>setFullname(val)}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent 
                    text={'Số điện thoại'} 
                    color={COLORS.HEX_BLACK} 
                    size={14} 
                    font={FONTFAMILY.montserrat_bold}/>
                <InputComponent 
                    placeholder='Nhập số điện thoại'
                    allowClear
                    value={phoneNumber}
                    backgroundColor={COLORS.WHITE}
                    onChange={val=>setPhoneNumber(val)}/>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <TextComponent 
                        text={'Đặt làm địa chỉ mặc định'} 
                        color={COLORS.HEX_BLACK} 
                        size={14} 
                        font={FONTFAMILY.montserrat_bold}/>
                    <TouchableOpacity onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ false: COLORS.AZURE_BLUE, true: COLORS.LIGHT_SKY_BLUE}}
                            thumbColor={isRemember ? COLORS.AZURE_BLUE : COLORS.LIGHT_SKY_BLUE}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                {loadingButton ? (<ActivityIndicator size={30} />) : 
                <ButtonComponent
                    text="Hoàn thành"
                    type="#00ADEF"
                    textColor={COLORS.WHITE}
                    onPress={HandleAddAddressByUser}
                />}
            </SectionComponent>
        </KeyboardAvoidingViewWrapper>
    )
}

export default Manage_Address;