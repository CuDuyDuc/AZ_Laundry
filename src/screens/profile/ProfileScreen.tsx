import {
  ArrowRight2,
  Book,
  LanguageCircle,
  Logout,
  Trash,
  Unlock
} from 'iconsax-react-native';
import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import COLORS from '../../assets/colors/Colors';
import {
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent
} from '../../components';
import AccountComponent from '../../components/AccountComponent';
import { authSelector } from '../../redux/reducers/authReducer';

const ProfileScreen = ({ navigation }: any) => {
  const user = useSelector(authSelector);
  console.log(user);

  return (
    <SectionComponent
      styles={{
        flex: 1,
        paddingHorizontal: 0,
      }}>
      <HeaderComponent title="Tài khoản" />

      <RowComponent
        onPress={() => {
          console.log('Test Account click!');
          navigation.navigate('EditInfoAccount')
        }}
        justify="space-between"
        styles={{
          padding: 20,
          backgroundColor: COLORS.WHITE,
          height: 100,
        }}>
        <RowComponent>
          {user?.photo ? (
            <Image
              style={{
                borderRadius: 40,
                width: 60,
                height: 60,
              }}
              source={{
                uri: user.photo,
              }}
            />
          ) : (
            <Image
              style={{
                borderRadius: 40,
                width: 60,
                height: 60,
              }}
              source={{
                uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png',
              }}
            />
          )}

          <SectionComponent styles={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: '100%',
          }}>
            <TextComponent
              text={user?.name}
              size={16}
              styles={{
                fontWeight: 'bold',
              }}
              color="black"
            />
            {user?.phone ? <TextComponent
              text={'0367459404'}
              size={14}
              color={COLORS.BLUE_GRAY}
            /> : <TextComponent
              text={'Add new phone number'}
              size={14}
              color={COLORS.BLUE_GRAY}
            />}
          </SectionComponent>
        </RowComponent>
        <ArrowRight2 size={32} color={COLORS.HEX_BLACK} />
      </RowComponent>
      <SpaceComponent height={10} />
      <AccountComponent
        onPress={() => { }}
        icon={<Book size="28" color={COLORS.AZURE_BLUE} />}
        title="Lịch sử đặt hàng"
      />
      <AccountComponent
        icon={<LanguageCircle size="28" color={COLORS.AZURE_BLUE} />}
        title="Ngôn ngữ"
        onPress={() => { }}
      />
      <AccountComponent
        icon={<Unlock size="28" color={COLORS.AZURE_BLUE} />}
        title="Đổi mật khẩu"
        onPress={() => { }}
      />
      <AccountComponent
        icon={<Logout size="28" color={COLORS.AZURE_BLUE} />}
        title="Đăng xuất"
        onPress={() => { }}
      />
      <AccountComponent
        icon={<Trash size="28" color={COLORS.AZURE_BLUE} />}
        title="Xoá tài khoản"
        onPress={() => { }}
      />
    </SectionComponent>
  );
};

export default ProfileScreen;
