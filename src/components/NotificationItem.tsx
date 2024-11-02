import * as Burnt from 'burnt';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import notificationAPI from '../apis/notificationApi';
import COLORS from '../assets/colors/Colors';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';
interface Props {
  title?: string;
  message?: string;
  idItem?: string;
  userId?: string;
  status?: string;
  onUpdateList?: () => void;
}

const NotificationItem = (props: Props) => {
  const {title, message, idItem, userId, onUpdateList, status} = props;

  const handleDeleteNotification = async () => {
    const res = await notificationAPI.HandleNotification(
      '/delete',
      {
        userId: userId,
        notificationDetailsId: idItem,
      },
      'delete',
    );
    if (res.status == 200) {
      onUpdateList?.();
      Burnt.toast({
        title: 'Xoá thành công',
      });
    }
  };

  const markNotificationAsRead = async() => {
    const res = await notificationAPI.HandleNotification(
      '/update-mark-read',
      {
        userId: userId,
        notificationDetailsId: idItem,
      },
      'patch',
    );
    if (res.status == 200) {
      onUpdateList?.();
    }
  }

  // Hàm để render thùng rác khi vuốt sang trái
  const renderRightActions = () => (
    <TouchableOpacity onPress={handleDeleteNotification}>
      <SectionComponent
        styles={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: 75,
          height: '100%',
          borderRadius: 10,
        }}>
        <TextComponent text={'Xoá'}/>
      </SectionComponent>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={markNotificationAsRead}>
      <RowComponent
        justify="space-between"
        styles={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: status === 'unread' ? COLORS.HEX_LIGHT_GREY : COLORS.WHITE,
          borderRadius: 10,
        }}>
        <RowComponent>
          <Image
            source={{
              uri: 'https://i.pinimg.com/enabled/564x/08/9c/87/089c87ae739f15517cd40c9865f0d43f.jpg',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
          />
          <SectionComponent
            styles={{
              flex: 1,
            }}>
            <TextComponent
              size={14}
              text={title}
              color={COLORS.HEX_BLACK}
              styles={{
                fontWeight: 'bold',
              }}
            />
            <TextComponent size={12} text={message} color={COLORS.HEX_BLACK} />
            <TextComponent
              text="20 phút trước"
              color={COLORS.HEX_BLACK}
              size={10}
            />
          </SectionComponent>
        </RowComponent>
      </RowComponent>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default NotificationItem;
