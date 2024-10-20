import { ArrowRight2 } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import COLORS from '../assets/colors/Colors';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';

interface Props {
  icon?: ReactNode,
  title?: string,
}
const AccountComponent = (props: Props) => {
  const { icon, title } = props;
  return (
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
  )
};

export default AccountComponent;
