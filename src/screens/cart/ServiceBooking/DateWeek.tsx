import DateTimePicker from '@react-native-community/datetimepicker';
import * as Burnt from 'burnt';
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
  TextComponent,
} from '../../../components';
import ContainerComponent from '../../../components/ContainerComponent';
import { useDateTime } from '../../../context/DateTimeContext';

const {height} = Dimensions.get('window');

export default function DateWeek({navigation, route}: any) {
  const {total} = route.params;
  const { receiveTime, setReceiveTime,sendTime, setSendTime,sendValue, setSendValue,receiveValue, setReceiveValue}= useDateTime()
  const [sendWeek, setSendWeek] = useState(0);
  const [receiveWeek, setReceiveWeek] = useState(0);
  const [sendIndex, setSendIndex] = useState(1);
  const [receiveIndex, setReceiveIndex] = useState(1);
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
      const start = moment().add(weekOffset, 'weeks').startOf('day');
      return [-1, 0, 1].map(adj => {
        return Array.from({length: 7})
          .map((_, index) => {
            const date = moment(start).add(adj, 'week').add(index, 'day');
            // Chỉ giữ lại các ngày sau ngày hiện tại
            if (date.isSameOrAfter(moment(), 'day')) {
              return {
                weekday: date.format('ddd'),
                date: date.toDate(),
              };
            }
            return null; // Nếu là ngày trước hiện tại, trả về null
          })
          .filter(Boolean); // Lọc bỏ các giá trị null
      });
    };

    return {
      sendWeeks: generateWeeks(sendWeek),
      receiveWeeks: generateWeeks(receiveWeek),
    };
  }, [sendWeek, receiveWeek]);

  const handleSendWeekChange = (ind: any) => {
    if (ind === 1) return; // Không thay đổi nếu chỉ số là 1 (hoặc không cần thay đổi)
    const newIndex = ind - 1;
    const newWeek = sendWeek + newIndex;
    const newDate = moment(sendValue).add(newIndex, 'week').toDate();

    // Kiểm tra nếu ngày gửi mới không được trước ngày hiện tại
    if (moment(newDate).isBefore(moment(), 'minute')) {
      Burnt.toast({
        title: 'Ngày gửi không thể trước ngày và giờ hiện tại',
      });
      return;
    }

    setSendWeek(newWeek);
    setSendValue(newDate);
    setSendMonth(moment(newDate).format('MMMM YYYY'));
  };

  // Hàm kiểm tra ngày nhận phải sau ngày gửi
  const handleReceiveWeekChange = (ind: any) => {
    if (ind === 1) return; // Không thay đổi nếu chỉ số là 1 (hoặc không cần thay đổi)
    const newIndex = ind - 1;
    const newWeek = receiveWeek + newIndex;
    const newDate = moment(receiveValue).add(newIndex, 'week').toDate();

    // Kiểm tra nếu ngày nhận không được trước ngày gửi
    if (moment(newDate).isBefore(moment(sendValue), 'day')) {
      Burnt.toast({
        title: 'Ngày nhận không thể trước ngày gửi',
      });
      return;
    }

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
            onIndexChanged={index => {
              if (index < 0 || index >= weeks.sendWeeks.length) {
                return; // Prevent swipe beyond the available weeks
              }
              handleSendWeekChange(index + 1); // Only allow valid index changes
            }}>
            {weeks.sendWeeks.map((dates, index) => (
              <RowComponent styles={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  if (item) {
                    // Kiểm tra item có phải là null hay không
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
                  }
                  return null; 
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
            scrollEnabled={!moment(receiveValue).isBefore(moment(), 'day')}  // Disable swiper if the sendValue is before today
            onIndexChanged={index => handleReceiveWeekChange(index + 1)}>
            {weeks.sendWeeks.map((dates, index) => (
              <RowComponent styles={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  if (item) {
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
                  }
                  return null;
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
          text={`Tổng: ${total ? total : 'lỗi'} VND`}
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
              sendDate: moment(sendValue).format('DD-MM-YYYY'), // Chuyển thành chuỗi
              receiveDate: moment(receiveValue).format('DD-MM-YYYY'), // Chuyển thành chuỗi
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
