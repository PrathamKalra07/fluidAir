/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme,  Text ,View} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import "./global.css";
import AppNavigator from './src/navigation/AppNavigator';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationProvider } from './src/context/NavigationContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <Provider store={store}>
        <NavigationProvider>
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <AppContent /> */}

      <AppNavigator />;
    </SafeAreaProvider>

        </NavigationProvider>
      </Provider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
