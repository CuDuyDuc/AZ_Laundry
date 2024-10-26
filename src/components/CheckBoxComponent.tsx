import {ArrowRight2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import COLORS from '../assets/colors/Colors';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';

interface Props {
  icon?: ReactNode;
  title?: string;
}
const CheckBoxComponent = (props: Props) => {
  const {icon, title} = props;
  return (
    <RowComponent>
      {icon}
      <SpaceComponent width={5} />
      <TextComponent
        text={title}
        size={14}
        styles={{
          fontWeight: '400',
        }}
        color={COLORS.HEX_LIGHT_GREY}
      />
    </RowComponent>
  );
};

export default CheckBoxComponent;
