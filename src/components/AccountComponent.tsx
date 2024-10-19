import React, { ReactNode } from 'react';
import RowComponent from './RowComponent';
import { LanguageCircle, ArrowRight2 } from 'iconsax-react-native';
import COLORS from '../assets/colors/Colors';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import { TouchableOpacity } from 'react-native';

interface Props {
  icon?: ReactNode,
  title?: string,
  onPress: () => void
}
const AccountComponent = (props: Props) => {
  const { icon, title, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <RowComponent
        justify='space-between'
        styles={{
          paddingHorizontal: 20,
          backgroundColor: COLORS.WHITE,
          height: 70,
        }}>
        <RowComponent>
          {icon}
          <SpaceComponent width={5} />
          <TextComponent
            text={title}
            size={14}
            styles={{
              fontWeight: '400'
            }}
            color={COLORS.HEX_BLACK} />
        </RowComponent>
        <ArrowRight2 size={28} color={COLORS.HEX_BLACK} />
      </RowComponent>
    </TouchableOpacity>
  )
};

export default AccountComponent;
