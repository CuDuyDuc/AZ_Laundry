import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../../assets/fonts';
import COLORS from '../../../assets/colors/Colors';
import { CardServiceComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../../components';
import { ProductTypeModel } from '../../../model/product_type';
import productTypeAPI from '../../../apis/tipAPI copy';

const ProductTypeScreen = ({navigation, route}: any) => {
  const {data} = route.params;
  const [productType, setProductType] = useState<ProductTypeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  }
  return (
    <ContainerComponent>
      <SectionComponent
        styles={{
          height: 83,
          backgroundColor: COLORS.AZURE_BLUE,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <RowComponent styles={{marginTop: 35}} justify="space-between">
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <ArrowLeft2 size="30" color={COLORS.WHITE} />
          </TouchableOpacity>
          <TextComponent
            text={`${data.service_type_name}`}
            font={FONTFAMILY.montserrat_medium}
          />
          <View></View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{marginTop:15}}>
        <CardServiceComponent  data={productType} isLoading={loading} onPress={handleProductType} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ProductTypeScreen;
