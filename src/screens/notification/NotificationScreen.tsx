import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { eventEmitter } from '../../../index.js';
import notificationAPI from '../../apis/notificationApi';
import { SectionComponent } from '../../components';
import NotificationItem from '../../components/NotificationItem';
import { NotificationModel } from '../../model/notification_model';
import { authSelector } from '../../redux/reducers/authReducer';
import COLORS from '../../assets/colors/Colors.ts';
const NotificationScreen = ({navigation} : any) => {
  const [listNoti, setListNoti] = useState<NotificationModel[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector(authSelector);

  const getListNotification = async () => {
  setLoading(true);
    const apiNoti = `/get-alls?userId=${user?.id}`;

    try {
      const res = await notificationAPI.HandleNotification
      (
        apiNoti,
      );
    setListNoti(() => res.data)
    setLoading(false);

    } catch (error) {
    console.log(error);
    setLoading(false);
    }
  }

  useEffect(() => {
    getListNotification();
    const subscription = eventEmitter.on('newNotification', getListNotification);

    return () => {
      subscription.off('newNotification', getListNotification);
    };
  }, [])

  return (
    <FlatList
      data={listNoti}
      keyExtractor={(item: any) => item?._id.toString()}
      refreshing= {loading}
      onRefresh={getListNotification}
      style={{marginTop: 20}}
      ListHeaderComponent={() => loading ? <ActivityIndicator size={'large'} color={COLORS.AZURE_BLUE} /> : null}
      renderItem={({ item }) => (
        <SectionComponent>
          <NotificationItem
            title={item?.title}
            message={item?.body}
            onUpdateList={getListNotification}
            idItem={item?._id.toString()}
            userId={user?.id}
            notiStatus={item?.status}
            createdAt={item?.createdAt}
            onPress={() =>  navigation.navigate('DetailNotificationScreen', {
              item : item
            }) }
          />
        </SectionComponent>
      )}
    />
  )
}

export default NotificationScreen;