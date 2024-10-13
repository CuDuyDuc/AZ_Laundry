import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonComponent, ContainerComponent } from '../../components';
import { removeAuth } from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    dispatch(removeAuth({}));
    await AsyncStorage.removeItem('auth');
    await GoogleSignin.signOut();
  };
  return (
    <ContainerComponent>
      <ButtonComponent
        styles={{marginTop: 100}}
        type="#00ADEF"
        text="LogOut"
        onPress={handleSignOut}
      />
    </ContainerComponent>
  );
};

export default HomeScreen;
