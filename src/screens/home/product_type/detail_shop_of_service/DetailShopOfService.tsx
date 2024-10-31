import React from 'react'
import { CardShopComponent, ContainerComponent, HeaderComponent, SectionComponent } from '../../../../components'

const DetailShopOfService = ({navigation,route}:any) => {
  const {data,latitude,longitude}= route.params
  const handleDetailShop=(item:any)=>{
    navigation.navigate('ProductOfProductTypeScreen',{data:data, infoShop:item})
    
}
  return (
  <ContainerComponent>
      <HeaderComponent title={`${data.id_service_type.service_type_name} > ${data.product_type_name}`} isBack onBack={() => navigation.goBack()} />
      <SectionComponent styles={{marginTop:15}}>
        <CardShopComponent onPress={handleDetailShop} id_product_type={data._id} currentLongitude={longitude} currentLatitude={latitude}/>
      </SectionComponent>
  </ContainerComponent>
  )
}

export default DetailShopOfService