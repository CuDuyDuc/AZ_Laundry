import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { FONTFAMILY } from '../../../../assets/fonts';
import COLORS from '../../../assets/colors/Colors';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent
} from '../../../components';
import ContainerComponent from '../../../components/ContainerComponent';

const {width, height} = Dimensions.get('window');

export default function DateWeek({ref, navigation}: any) {
  const [sendValue, setSendValue] = useState(new Date());
  const [sendWeek, setSendWeek] = useState(0);
  const [receiveValue, setReceiveValue] = useState(new Date());
  const [receiveWeek, setReceiveWeek] = useState(0);
  const [sendIndex, setSendIndex] = useState(1);
  const [receiveIndex, setReceiveIndex] = useState(1);

  const [receiveTime, setReceiveTime] = useState(new Date());
  const [sendTime, setSendTime] = useState(new Date());
  const [showSendTimePicker, setShowSendTimePicker] = useState(false);
  const [showReceiveTimePicker, setShowReceiveTimePicker] = useState(false);

  const [sendMonth, setSendMonth] = useState(
    moment(sendValue).format('MMMM YYYY'),
  );
  const [receiveMonth, setReceiveMonth] = useState(
    moment(receiveValue).format('MMMM YYYY'),
  );

  const weeks = React.useMemo(() => {
    const generateWeeks = (weekOffset: any) => {
      const start = moment().add(weekOffset, 'weeks').startOf('week');
      return [-1, 0, 1].map(adj => {
        return Array.from({length: 7}).map((_, index) => {
          const date = moment(start).add(adj, 'week').add(index, 'day');
          return {
            weekday: date.format('ddd'),
            date: date.toDate(),
          };
        });
      });
    };
    return {
      sendWeeks: generateWeeks(sendWeek),
      receiveWeeks: generateWeeks(receiveWeek),
    };
  }, [sendWeek, receiveWeek]);

  const handleSendWeekChange = (ind: any) => {
    if (ind === 1) return;
    const newIndex = ind - 1;
    const newWeek = sendWeek + newIndex;
    const newDate = moment(sendValue).add(newIndex, 'week').toDate();
    setSendWeek(newWeek);
    setSendValue(newDate);
    setSendMonth(moment(newDate).format('MMMM YYYY'));
  };

  const handleReceiveWeekChange = (ind: any) => {
    if (ind === 1) return;
    const newIndex = ind - 1;
    const newWeek = receiveWeek + newIndex;
    const newDate = moment(receiveValue).add(newIndex, 'week').toDate();
    setReceiveWeek(newWeek);
    setReceiveValue(newDate);
    setReceiveMonth(moment(newDate).format('MMMM YYYY'));
  };

  const handleSendTimeChange = (event: any, selectedDate: any) => {
    setShowSendTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSendTime(selectedDate);
    }
  };
  const handleReceiveTimeChange = (event: any, selectedDate: any) => {
    setShowReceiveTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setReceiveTime(selectedDate);
    }
  };
  useEffect(() => {
    // Cập nhật sendIndex khi sendWeek thay đổi
    setSendIndex(1); // Đặt lại về index 1 mỗi khi sendWeek thay đổi
  }, [sendWeek]);

  useEffect(() => {
    // Cập nhật receiveIndex khi receiveWeek thay đổi
    setReceiveIndex(1); // Đặt lại về index 1 mỗi khi receiveWeek thay đổi
  }, [receiveWeek]);
  return (
    <>
      <ContainerComponent>
        <HeaderComponent
          title="Đặt lịch"
          isBack
          onBack={() => navigation.goBack()}
        />
        <SectionComponent>
          <TextComponent
            text="Thời gian làm việc"
            color={COLORS.AZURE_BLUE}
            size={14}
            styles={{marginTop: 25}}
            font={FONTFAMILY.montserrat_bold}
          />
          <RowComponent justify="space-between">
            <TextComponent
              text="Ngày gửi đồ"
              color={COLORS.HEX_BLACK}
              size={14}
            />
            <TextComponent
              text={sendMonth}
              color={COLORS.HEX_BLACK}
              size={14}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent styles={styles.picker}>
          <Swiper
            key={sendWeek}
            index={sendIndex}
            loop={false}
            showsPagination={false}
            height={height * 0.2}
            onIndexChanged={handleSendWeekChange}>
            {weeks.sendWeeks.map((dates, index) => (
              <RowComponent styles={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    sendValue.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => {
                        setSendValue(item.date);
                        setSendMonth(moment(item.date).format('MMMM YYYY'));
                      }}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#00ADEF',
                            borderColor: '#00ADEF',
                          },
                        ]}>
                        <TextComponent
                          text={item.weekday}
                          size={13}
                          color={COLORS.HEX_BLACK}
                          styles={[styles.itemWeekday]}
                        />
                        <TextComponent
                          text={String(item.date.getDate())}
                          color={COLORS.HEX_BLACK}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </RowComponent>
            ))}
          </Swiper>
        </SectionComponent>

        <SectionComponent>
          <TextComponent text="Giờ gửi đồ" color={COLORS.HEX_BLACK} size={14} />
          <TextComponent
            text="Vui lòng chọn giờ gửi đồ mong muốn"
            color={COLORS.HEX_LIGHT_GREY}
            size={14}
          />
          <SpaceComponent height={20} />
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setShowSendTimePicker(true)}>
            <TextComponent
              text={moment(sendTime).format('HH : mm')}
              color={COLORS.HEX_BLACK}
            />
          </TouchableOpacity>
          {showSendTimePicker && (
            <DateTimePicker
              value={sendTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleSendTimeChange}
            />
          )}
        </SectionComponent>

        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Ngày nhận đồ"
              color={COLORS.HEX_BLACK}
              size={14}
            />
            <TextComponent
              text={receiveMonth}
              color={COLORS.HEX_BLACK}
              size={14}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent styles={styles.picker}>
          <Swiper
            key={receiveWeek}
            index={receiveIndex}
            loop={false}
            showsPagination={false}
            height={height * 0.2}
            style={{ marginHorizontal: 16 }}
            onIndexChanged={handleReceiveWeekChange}>
            {weeks.receiveWeeks.map((dates, index) => (
              <RowComponent styles={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    receiveValue.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => {
                        setReceiveValue(item.date);
                        setReceiveMonth(moment(item.date).format('MMMM YYYY'));
                      }}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#00ADEF',
                            borderColor: '#00ADEF',
                          },
                        ]}>
                        <TextComponent
                          text={item.weekday}
                          size={13}
                          color={COLORS.HEX_BLACK}
                          styles={[styles.itemWeekday]}
                        />
                        <TextComponent
                          text={String(item.date.getDate())}
                          color={COLORS.HEX_BLACK}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </RowComponent>
            ))}
          </Swiper>
        </SectionComponent>

        <SectionComponent>
          <TextComponent
            text="Giờ nhận đồ"
            color={COLORS.HEX_BLACK}
            size={14}
          />
          <TextComponent
            text="Vui lòng chọn nhận gửi đồ mong muốn"
            color={COLORS.HEX_LIGHT_GREY}
            size={14}
          />
          <SpaceComponent height={20} />
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setShowReceiveTimePicker(true)}>
            <TextComponent
              text={moment(receiveTime).format('HH : mm')}
              color={COLORS.HEX_BLACK}
            />
          </TouchableOpacity>
          {showReceiveTimePicker && (
            <DateTimePicker
              value={receiveTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleReceiveTimeChange}
            />
          )}
        </SectionComponent>
      </ContainerComponent>
      <SectionComponent
        styles={{
          backgroundColor: COLORS.AZURE_BLUE,
        }}>
        <SpaceComponent height={20} />
        <TextComponent
          size={16}
          text="Tổng: 80,000 VND"
          color={COLORS.WHITE}
          font={FONTFAMILY.montserrat_bold}
        />
        <SpaceComponent height={20} />
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: COLORS.WHITE,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('BookingScreen', {
              sendDate: moment(sendValue).format('YYYY-MM-DD'), // Chuyển thành chuỗi
              receiveDate: moment(receiveValue).format('YYYY-MM-DD'), // Chuyển thành chuỗi
              sendTime: moment(sendTime).format('HH:mm'), // Đã là chuỗi
              receiveTime: moment(receiveTime).format('HH:mm'), // Đã là chuỗi
            });
          }}>
          <TextComponent
            text="XÁC NHẬN"
            color={COLORS.AZURE_BLUE}
            font={FONTFAMILY.montserrat_bold}
            size={13}
          />
        </TouchableOpacity>
        <SpaceComponent height={20} />
      </SectionComponent>
    </>
  );
}

const styles = StyleSheet.create({
  timePickerButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: COLORS.AZURE_BLUE,
    marginHorizontal: 140,
  },
  picker: {
    height: height * 0.14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 15,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#00ADEF',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemWeekday: {
    fontWeight: '500',
    marginBottom: 4,
  },
});
