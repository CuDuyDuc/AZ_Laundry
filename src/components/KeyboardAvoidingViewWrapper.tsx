import React, { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import COLORS from '../assets/colors/Colors';

interface Props {
    children: ReactNode;
}

const KeyboardAvoidingViewWrapper = (props: Props) => {

    const {children} = props
    return (
        <KeyboardAvoidingView style = {{flex : 1, backgroundColor: COLORS.WHISPER_GRAY}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingViewWrapper