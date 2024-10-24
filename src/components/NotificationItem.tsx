import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import SectionComponent from './SectionComponent';
import { appInfo } from '../apis/appInfo';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { Swipeable } from 'react-native-gesture-handler';

interface Props {
  title?: string;
  body?: string;
}
const NotificationItem = (props: Props) => {
  const {title, body } = props;
    // Hàm để render thùng rác khi vuốt sang trái
    const renderRightActions = () => (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteText}>🗑️</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <RowComponent justify='space-between' styles={styles.item}>
          <RowComponent>
            <Image
              source={{ uri: 'https://i.pinimg.com/enabled/564x/08/9c/87/089c87ae739f15517cd40c9865f0d43f.jpg' }}
              style={styles.largeIcon}
            />
            <SectionComponent styles={{}}>
              <TextComponent
                size={14}
                text={title}
                styles={{
                  fontWeight: 'bold'
                }}
              />
              <TextComponent
                size={12}
                text={body}
              />
              <TextComponent
                text='20 phút trước'
                size={10}
              />
            </SectionComponent>
          </RowComponent>
        </RowComponent>
      </Swipeable>
    );
};

export default NotificationItem;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  largeIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
    borderRadius: 10,
  },
  deleteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
