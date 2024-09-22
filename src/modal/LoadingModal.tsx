import { View, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../assets/colors/Colors';
import { TextComponent } from '../components';

interface Props {
    visible: boolean,
    mess?: string,
}

const LoadingModal = (props: Props) => {

    const {visible, mess} = props;
    return (
        <Modal 
            style={{flex: 1}} 
            transparent 
            statusBarTranslucent
            visible= {visible}>
            <View 
                style = {{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <ActivityIndicator color={COLORS.AZURE_BLUE} size={32}/>
                <TextComponent text='Loading' flex={0} color={COLORS.WHITE}/>
            </View>
        </Modal>
    )
}

export default LoadingModal;