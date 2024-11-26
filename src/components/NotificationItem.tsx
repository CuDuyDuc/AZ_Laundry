import * as Burnt from 'burnt';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import notificationAPI from '../apis/notificationApi';
import COLORS from '../assets/colors/Colors';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';
import CircleComponent from './CircleComponent';
import moment from 'moment'; 
import 'moment/locale/vi'; 
var EventEmitter = require('eventemitter3');
export const eventEmitterUpdateRead = new EventEmitter();
interface Props {
  title?: string;
  message?: string;
  idItem?: string;
  userId?: string;
  notiStatus?: string;
  createdAt?: string;
  onUpdateList?: () => void;
  onPress?: () => void;
  
}

const NotificationItem = (props: Props) => {
  const {title, message, idItem, userId, notiStatus, createdAt,  onUpdateList, onPress} = props;
  const vietnamTime = moment.utc(createdAt).utcOffset(7); 

  const currentTime = moment().utcOffset(7);

  const formattedTime = vietnamTime.fromNow(); 

  const handleDeleteNotification = async () => {
    const res = await notificationAPI.HandleNotification(
      '/delete',
      {
        userId: userId,
        notificationId: idItem,
      },
      'delete',
    );
    if (res.status == 200) {
      onUpdateList?.();
      eventEmitterUpdateRead.emit('updateCountNotiRead');

      Burnt.toast({
        title: 'Xoá thành công',
      });
    }
  };
  const markNotificationAsRead = async () => {
    try {
      const res = await notificationAPI.HandleNotification(
        '/update-mark-read',
        {
          userId: userId,
          notificationId: idItem,
        },
        'patch',
      );
      if (res.status == 200) {
        onUpdateList?.();
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleUpdateMark = async () => {
    await markNotificationAsRead();
    onUpdateList?.();
    onPress?.();
    eventEmitterUpdateRead.emit('updateCountNotiRead');
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
   <TouchableOpacity onPress={notiStatus =='read' ? () =>{onPress?.()} : handleUpdateMark} >
     <Swipeable renderRightActions={renderRightActions}>
      <RowComponent
        justify="space-between"
        styles={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: 'white',
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
              text={formattedTime}
              color={COLORS.HEX_BLACK}
              size={10}
            />
          </SectionComponent>
          { notiStatus === 'unread' && <CircleComponent color='red' size={10} />}

        </RowComponent>
        
      </RowComponent>
    </Swipeable>
   </TouchableOpacity>
  );
};

export default NotificationItem;
