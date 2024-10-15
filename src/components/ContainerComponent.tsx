import { View, ImageBackground, SafeAreaView, ViewStyle, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../styles/globalStyle';
import { ScrollView } from 'react-native-virtualized-view';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
  styleBackground?:StyleProp<ViewStyle>
}
const ContainerComponent = (props: Props) => {

  const { isImageBackground, isScroll, title, children, back ,styleBackground} = props;

  const returnContainer = isScroll ? <ScrollView>{children}</ScrollView> : <View>{children}</View>;
  return isImageBackground ? (<ImageBackground>{returnContainer}</ImageBackground>) : (
    <SafeAreaView style = {[globalStyle.container,styleBackground]}>
      <View>
        {returnContainer}
      </View>
    </SafeAreaView>
  );
};

export default ContainerComponent;