import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import notifee from '@notifee/react-native'
import { NotificationModel } from '../../model/notification_model';
import notificationAPI from '../../apis/notificationApi';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import { SectionComponent } from '../../components';
import NotificationItem from '../../components/NotificationItem';
import { eventEmitter } from '../../../index.js'
const NotificationScreen = () => {
  const [listNoti, setListNoti] = useState<NotificationModel[]>();
  const user = useSelector(authSelector);

  const getListNotification = async () => {
    const apiNoti = `/get-alls?userId=${user?.id}`;
      
      const res = await notificationAPI.HandleNotification
        (
        apiNoti,
      );
     setListNoti(() => res.data)
  }

  useEffect(()=> {
    getListNotification(); 
        // Lắng nghe sự kiện 'newNotification'
        const subscription = eventEmitter.on('newNotification', getListNotification);

        // Hủy lắng nghe sự kiện khi component unmount
        return () => {
          subscription.off('newNotification', getListNotification);
        };
  },[])
      
    return (
      <FlatList
      data={listNoti}
      keyExtractor={(item : any) => item?._id.toString()}
      renderItem={({item}) => (
       <SectionComponent>
       <NotificationItem 
       title={item?.title}
       message= {item?.message}
       onUpdateList={getListNotification}
       idItem={item?._id}
       userId={user?.id}
       />
       </SectionComponent>
      )}
    />
    )
}

export default NotificationScreen;