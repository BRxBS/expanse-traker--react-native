import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components';


import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
 } from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme'
import {  SignIn} from './src/screens/SignIn/index';
import { AuthProvider } from './src/hooks/auth';
import {AppRoutes} from './src/routes/app.routes'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLaded] =  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
    <StatusBar barStyle = 'dark-content' hidden = {false} backgroundColor = "#FD98CF" />
      {/* <NavigationContainer>
      <AppRoutes/>
      </NavigationContainer> */}
      <AuthProvider>
      <SignIn/>
      </AuthProvider>


        </View>




    </ThemeProvider>

  );
}


