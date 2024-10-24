import React from 'react';
import { GestureResponderEvent, Image, TouchableOpacity, View } from 'react-native';
import { useChatContext } from '../context/ChatContext';
import { globalStyle } from '../styles/globalStyle';
import ColumnComponent from './ColumnComponent';
import TextComponent from './TextComponent';

interface Props {
    image: string;
    name: string;
    onPress?: (event: GestureResponderEvent) => void | undefined;
    idUserPosition: string;
}

const CardListFriend = (props: Props) => {
    const { image, name, onPress, idUserPosition } = props;
    const { onlineUsers } = useChatContext();
    const getLastWord = (str: string): string => {
        if (str != null) {
            const parts = str.split(' ');
            return parts[parts.length - 1];
        }
        return 'null';
    };
    const isActive = onlineUsers.some((user: any) => user?.userId === idUserPosition);
    return (
        <TouchableOpacity style={{ maxWidth: 50, marginEnd: 20 }} onPress={onPress}>
            <ColumnComponent>
                <View style={{ position: 'relative' }}>
                    {image ? (
                        <Image source={{ uri: image }} style={globalStyle.avatarImage} />
                    ) : (
                        <Image source={{uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'}} style={globalStyle.avatarImage} />
                    )}

                    {isActive ? (
                        <View
                            style={globalStyle.dotGreenActive}
                        />
                    ) : undefined}
                </View>
                <TextComponent text={getLastWord(name)} />
            </ColumnComponent>
        </TouchableOpacity>
    );
};

export default CardListFriend;
