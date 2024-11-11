import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as Burnt from 'burnt'
import { HeaderComponent, SectionComponent, TextComponent } from '../../../components';
import COLORS from '../../../assets/colors/Colors';

const DetailNotificationScreen = ({navigation}: any) => {
  
    return (
        <View style={{backgroundColor:COLORS.WHISPER_GRAY,position:'relative', flex:1}}>
            <HeaderComponent title={`Thông báo chi tiết`} isBack onBack={() => navigation.goBack()}/>
            <SectionComponent>
                <TextComponent text={'hello'} />
            </SectionComponent>
        </View>
    )
}

export default DetailNotificationScreen