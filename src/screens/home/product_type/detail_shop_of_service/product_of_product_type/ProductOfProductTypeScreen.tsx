import React, { useEffect, useState } from 'react'
import { ContainerComponent, HeaderComponent, SectionComponent, TextComponent } from '../../../../../components'
import COLORS from '../../../../../assets/colors/Colors'
import { FONTFAMILY } from '../../../../../../assets/fonts'
import CardProductOfProductType from '../../../../../components/CardProductOfProductTypeComponent'
import { ProductModel } from '../../../../../model/product'
import productAPI from '../../../../../apis/productAPI'

const ProductOfProductTypeScreen = ({navigation,route}:any) => {
    const {data, infoShop}=route.params
    
    const [products,setProducts]= useState<ProductModel[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const getDataProducts = async () => {
      try {
          const res = await productAPI.HandleProduct(`/get-product-by-user/${infoShop._id??infoShop.id}/and-product/${data._id}`)
          const dataProducts:ProductModel[] = res.data
          setProducts(dataProducts)
          setLoading(false);
      } catch (error) {
          console.log('Error fetching shop: ', error);
          setLoading(false);
      }
  };
    useEffect(()=>{
      getDataProducts()
    },[])
  return (
    <ContainerComponent>
      <HeaderComponent title={`${data.id_service_type.service_type_name} > ${data.product_type_name}`} isBack onBack={() => navigation.goBack()} />
      <SectionComponent styles={{marginTop:15}}>
        <TextComponent text={`Danh sách dịch vụ`} color={COLORS.DARK_GRAY} font={FONTFAMILY.montserrat_semibold}/>
        <CardProductOfProductType isLoading={loading} products={products} />
      </SectionComponent>
  </ContainerComponent>
  )
}

export default ProductOfProductTypeScreen