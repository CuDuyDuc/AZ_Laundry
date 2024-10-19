import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import AppRouters from './src/navigators/AppRouters';
import store from './src/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent />
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </>
  )
}

export default App;