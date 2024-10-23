import React, { useEffect, useState } from 'react';
import productTypeAPI from '../../../apis/product_typeAPI';
import { CardServiceComponent, ContainerComponent, HeaderComponent, SectionComponent } from '../../../components';
import { ProductTypeModel } from '../../../model/product_type';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../redux/reducers/authReducer';
import { useRole } from '../../../permission/permission';

const ProductTypeScreen = ({navigation, route}: any) => {
  const {data,latitude,longitude} = route.params;
  const [productType, setProductType] = useState<ProductTypeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector(authSelector);
  const { isUser, isShop } = useRole();
  const getDataProductType = async () => {
      try {
          const res = await productTypeAPI.HandleProductType(`/get-product-type?id_service_type=${data._id}`);
          const dataProduct:ProductTypeModel[] = res.data
          setProductType(dataProduct)
          setLoading(false);
      } catch (error) {
          console.log('Error fetching service types: ', error);
          setLoading(false);
      }
  };

  useEffect(() => {
    getDataProductType();
  }, []);
  const handleProductType=(item:any)=>{
    if(isUser){
      navigation.navigate("DetailShopOfService",{data:item,latitude:latitude,longitude:longitude})
    }
    if(isShop){
      navigation.navigate("ProductOfProductTypeScreen",{data:item,infoShop:user})
    }
    
  }
  return (
    <ContainerComponent>
      <HeaderComponent title={`${data.service_type_name}`} isBack onBack={() => navigation.goBack()} />
      <SectionComponent styles={{marginTop:15}}>
        <CardServiceComponent  data={productType} isLoading={loading} onPress={handleProductType} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ProductTypeScreen;
