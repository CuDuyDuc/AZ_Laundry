import { View, ImageBackground, ScrollView, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../styles/globalStyle';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
}
const ContainerComponent = (props: Props) => {

  const { isImageBackground, isScroll, title, children, back } = props;

  const returnContainer = isScroll ? <ScrollView>{children}</ScrollView> : <View>{children}</View>;
  return isImageBackground ? (<ImageBackground>{returnContainer}</ImageBackground>) : (
    <SafeAreaView style = {[globalStyle.container]}>
      <View>
        {returnContainer}
      </View>
    </SafeAreaView>
  );
};

export default ContainerComponent;