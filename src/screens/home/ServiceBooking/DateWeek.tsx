import moment from 'moment';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import ContainerComponent from '../../../components/ContainerComponent';
import {
  ButtonComponent,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import COLORS from '../../../assets/colors/Colors';
import {FONTFAMILY} from '../../../../assets/fonts';
import {globalStyle} from '../../../styles/globalStyle';

const {width, height} = Dimensions.get('window');

export default function DateWeek({navigation}: any) {
  const sendSwiper = useRef();
  const receiveSwiper = useRef();
  const [sendValue, setSendValue] = useState(new Date());
  const [sendWeek, setSendWeek] = useState(0);
  const [receiveValue, setReceiveValue] = useState(new Date());
  const [receiveWeek, setReceiveWeek] = useState(0);

  const weeks = React.useMemo(() => {
    const generateWeeks = (weekOffset: moment.DurationInputArg1) => {
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

  return (
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
            text="ngày Gửi đồ"
            color={COLORS.HEX_BLACK}
            size={14}
          />
          <TextComponent
            text="tháng 8/2023"
            color={COLORS.HEX_BLACK}
            size={14}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={styles.picker}>
        <Swiper
          index={1}
          loop={false}
          showsPagination={false}
          height={height * 0.2}
          onIndexChanged={ind => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = sendWeek + newIndex;
              setSendWeek(newWeek);
              setSendValue(moment(sendValue).add(newIndex, 'week').toDate());
            }, 100);
          }}>
          {weeks.sendWeeks.map((dates, index) => (
            <RowComponent styles={styles.itemRow} key={index}>
              {dates.map((item, dateIndex) => {
                const isActive =
                  sendValue.toDateString() === item.date.toDateString();
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setSendValue(item.date)}>
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
        <TextComponent text="Giờ gửi đồ" color={COLORS.HEX_BLACK} size={14} />
        <TextComponent
          text="Vui lòng chọn giờ gửi đồ mong muốn"
          color={COLORS.HEX_LIGHT_GREY}
          size={14}
        />
        <SpaceComponent height={10} />
        <RowComponent justify="center">
          <ButtonComponent
            text="21"
            type="#00ADEF"
            styles={[
              globalStyle.button,
              {borderWidth: 1, borderColor: '#00ADEF', margin: 2.5},
            ]}
            textColor={COLORS.WHITE}
          />
          <ButtonComponent
            text="20"
            type="#00ADEF"
            styles={[
              globalStyle.button,
              {borderWidth: 1, borderColor: '#00ADEF', margin: 2.5},
            ]}
            textColor={COLORS.WHITE}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent
            text="Ngày Nhận đồ"
            color={COLORS.HEX_BLACK}
            size={14}
          />
          <TextComponent
            text="Tháng 8/2023"
            color={COLORS.HEX_BLACK}
            size={14}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={styles.picker}>
        <Swiper
          index={1}
          loop={false}
          showsPagination={false}
          height={height * 0.2}
          onIndexChanged={ind => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = receiveWeek + newIndex;
              setReceiveWeek(newWeek);
              setReceiveValue(
                moment(receiveValue).add(newIndex, 'week').toDate(),
              );
            }, 100);
          }}>
          {weeks.receiveWeeks.map((dates, index) => (
            <RowComponent styles={styles.itemRow} key={index}>
              {dates.map((item, dateIndex) => {
                const isActive =
                  receiveValue.toDateString() === item.date.toDateString();
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setReceiveValue(item.date)}>
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
        <TextComponent text="Giờ nhận đồ" color={COLORS.HEX_BLACK} size={14} />
        <TextComponent
          text="Vui lòng chọn giờ nhận đồ mong muốn"
          color={COLORS.HEX_LIGHT_GREY}
          size={14}
        />
        <SpaceComponent height={10} />
        <RowComponent justify="center">
          <ButtonComponent
            text="21"
            type="#00ADEF"
            styles={[
              globalStyle.button,
              {borderWidth: 1, borderColor: '#00ADEF', margin: 2.5},
            ]}
            textColor={COLORS.WHITE}
          />
          <ButtonComponent
            text="20"
            type="#00ADEF"
            styles={[
              globalStyle.button,
              {borderWidth: 1, borderColor: '#00ADEF', margin: 2.5},
            ]}
            textColor={COLORS.WHITE}
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={15} />
      <SectionComponent
        styles={{
          backgroundColor: COLORS.AZURE_BLUE,
        }}>
        <SpaceComponent height={10} />
        <TextComponent
          size={18}
          text="Tổng: 80,000 VND"
          color={COLORS.WHITE}
          font={FONTFAMILY.montserrat_bold}
          styles={{marginTop: 10}}
        />
        <TextComponent
          text="Đã bao gồm phí ship"
          color={COLORS.WHITE}
          size={14}
        />
        <TextComponent
          text="Đã bao gồm phí giặt gấp (10,000 VND)"
          color={COLORS.WHITE}
          size={14}
        />
        <SpaceComponent height={10} />
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: COLORS.WHITE,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            marginBottom: 10,
            marginTop: 10,
          }}>
          <TextComponent
            text={'Tiêp theo'}
            color={COLORS.AZURE_BLUE}
            styles={{marginRight: 5}}
          />
        </TouchableOpacity>
      </SectionComponent>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
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
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemWeekday: {
    fontWeight: '500',
    marginBottom: 4,
  },
});
