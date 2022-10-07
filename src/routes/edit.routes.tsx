import  React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { EditScreen } from '../screens/Edit';

const {Navigator, Screen} = createStackNavigator();

export function EditRoutes() {
  return (
    <Navigator   
    screenOptions={{
        headerShown: false
      }}>
      <Screen name="EditScreen" component={EditScreen} />

    </Navigator>
  );
}
