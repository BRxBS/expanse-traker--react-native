import  React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/SignIn';
import { EditScreen } from '../screens/Edit';

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator   
    screenOptions={{
        headerShown: false
      }}>
      <Screen name="signIn" component={SignIn} />

    </Navigator>
  );
}
