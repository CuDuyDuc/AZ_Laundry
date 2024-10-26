import { ArrowLeft2 } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { StatusBar, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';

interface Props {
    title?: string;
    isBack?: Boolean;
    onBack?: () => void;
    suffix?: ReactNode, 
    onPress?:()=>void
}
export default function HeaderComponent(props: Props) {

    const { title, isBack, onBack,suffix,onPress } = props;
    return (
        <SectionComponent
            styles={{
                padding: 0,
                height: 83,
                backgroundColor: COLORS.AZURE_BLUE,
                flexDirection: 'column',
                justifyContent: 'center',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16
            }}>
            <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent/>
            <RowComponent styles={{ marginTop: 35 }} justify="space-between" >
                {isBack ? (<TouchableOpacity onPress={onBack}>
                    <ArrowLeft2 size="30" color={COLORS.WHITE} />
                </TouchableOpacity>) : <View></View>}
                <TextComponent
                    text={title}
                    font={FONTFAMILY.montserrat_medium}
                />
                {suffix?
                (<TouchableOpacity onPress={onPress}>{suffix}</TouchableOpacity>):(<View></View>)}
            </RowComponent>
        </SectionComponent>
    )
}

