import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../../../assets/colors/Colors'
import { CheckBoxComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../../../../components'
import { Add, Cd, Trash } from 'iconsax-react-native'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../../../redux/reducers/authReducer'
import { UserModel } from '../../../../../model/user_model'
import authenticationAPI from '../../../../../apis/authAPI'
import { FONTFAMILY } from '../../../../../../assets/fonts'
import { globalStyle } from '../../../../../styles/globalStyle'
import { ObjectId } from 'mongoose'
import * as Burnt from "burnt";
import { useAddresses } from '../../../../../context/AddressesContext'

const AddressSelection = ({navigation, route}: any) => {
  const {dataInfoUser,setDataInfoUser}= useAddresses()
  const [dataUser,setDataUser]= useState<UserModel[]>([])
  const [selectedItem, setSelectedItem] = useState<ObjectId | null>(null);
  const user = useSelector(authSelector)
  const getUserById=async()=>{
    try {
      const res:any = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${user.id}`)
      setDataUser(res)
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleDelete= async(item:any)=>{
    
    try {
      const res:any = await authenticationAPI.HandleAuthentication(`/delete-list-addresses/${user.id}/${item._id}`,{},'delete')
      if(res){
        Burnt.toast({
          title: res.message,

      });
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    
    if(dataInfoUser){
      setSelectedItem(dataInfoUser?._id);
    }else{
      if (dataUser.length > 0 && !selectedItem && dataUser[0]?.list_addresses?.[0].address && dataUser[0]?.list_addresses?.[0].full_name && dataUser[0]?.list_addresses?.[0].phone_number &&dataUser[0]?.list_addresses?.[0].location?.coordinates) {
        setSelectedItem(dataUser[0]?.list_addresses?.[0]?._id);
        setDataInfoUser(dataUser[0]?.list_addresses?.[0])
      }
    }
  }, [dataUser,selectedItem])
  useEffect(()=>{
    getUserById()
  },[dataUser])
  const handleChoseAddress =(item:any)=>{
    if(item?.address && item?.full_name && item?.phone_number && item?.location?.coordinates.length>0){
      setSelectedItem(item._id)
      setDataInfoUser(item)
      navigation.goBack()
    }else{
      Burnt.toast({
        title: "Vui lòng cập nhật thông tin",

    });
    }
    
  }
  return (
    <View style={{backgroundColor:COLORS.WHISPER_GRAY,position:'relative', flex:1}}>
      <HeaderComponent title={`Địa chỉ của bạn`} isBack onBack={() => navigation.goBack()}/>
      <FlatList data={dataUser[0]?.list_addresses}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item})=>(
          <SectionComponent styles={globalStyle.styleSection}>
            <TouchableOpacity onPress={()=>handleChoseAddress(item)}>
              <RowComponent justify='space-between' >
                <View style={{flex:1}}>
                  <CheckBoxComponent icon={
                    <Cd
                      size="18"
                      color={selectedItem===item._id?COLORS.AZURE_BLUE:COLORS.HEX_LIGHT_GREY}/>
                    }/>
                </View>
                <View style={{flex:8}}>
                  <TextComponent text={`${item?.full_name} | ${item?.phone_number?item.phone_number:'Trống'}`} color={COLORS.HEX_LIGHT_GRAY}/>
                  <TextComponent text={`${item?.address}`} color={COLORS.HEX_LIGHT_GRAY}/>
                </View>
                <View>
                  <TouchableOpacity >
                    <TextComponent text={'Sửa'} color={COLORS.RED} font={FONTFAMILY.montserrat_bold} size={13}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>handleDelete(item)}>
                    <Trash size="32" color={COLORS.HEX_LIGHT_GRAY}/>
                  </TouchableOpacity>
                </View>
              </RowComponent>
            </TouchableOpacity>
          </SectionComponent>
        )}/>
      <SectionComponent styles={globalStyle.styleSection}>
        <TouchableOpacity onPress={()=>navigation.navigate('ManageAddressScreen')}>
          <RowComponent justify='space-between'>
            <TextComponent text={'Thêm địa chỉ mới'} color={COLORS.HEX_BLACK}/>
            <Add size="32" color={COLORS.ORANGE}/>
          </RowComponent>
        </TouchableOpacity>
      </SectionComponent>
    </View>
  )
}

export default AddressSelection