import React from 'react';
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import COLORS from '../assets/colors/Colors';
import { FONTFAMILY } from '../../assets/fonts';
import { Button, View } from 'react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    title?: string;
    isBack?: Boolean;
    onBack?: () => void
  }
export default function HeaderComponent (props: Props) {

    const {title, isBack, onBack} = props;
    return(
       <SectionComponent
       styles= {{
           padding:0,
           height: 83,
               backgroundColor: COLORS.AZURE_BLUE,
                   flexDirection: 'column',
                       justifyContent: 'center',
       }
   }>
       <RowComponent styles={ { marginTop: 35 } } justify = "space-between" >
       {isBack  ?  ( <TouchableOpacity onPress= {onBack}>
        <ArrowLeft2 size="30" color={COLORS.WHITE} />
    </TouchableOpacity>): <SpaceComponent/>}
     
           <TextComponent
               text={title}
   font = { FONTFAMILY.montserrat_medium }
       />
       <SpaceComponent />
           </RowComponent>
           </SectionComponent>
    )
}

