import React from "react";
import {Platform} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import {MaterialIcons} from '@expo/vector-icons'

import { Dashboard } from "../screens/Dashboard/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";

const Tab = createBottomTabNavigator();


export function AppRoutes(){
    
    const theme = useTheme()
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: theme.colors.secundary,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarLabelPosition: 'beside-icon',
            tabBarStyle: {
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height: 60
            }
        }}
        >
            <Tab.Screen
            name="Listagem"
            component={Dashboard}
            options={{
                tabBarIcon: (({size, color}) => (
                    <MaterialIcons
                    name="format-list-bulleted"
                    size={size}
                    color={color}
                    />
                )),
                headerShown: false
            }}
            />
           <Tab.Screen
            name="Cadastrar"
            component={Register}
            options={{
                tabBarIcon: (({size, color}) => (
                    <MaterialIcons
                    name="attach-money"
                    size={size}
                    color={color}
                    />
                )),
                headerShown: false ,
            }}
        
            />
            <Tab.Screen
            name="Resumo"
            component={Resume}
            options={{
                tabBarIcon: (({size, color}) => (
                    <MaterialIcons
                    name="pie-chart"
                    size={size}
                    color={color}
                    />
                )),
                headerShown: false
            }}
            
            />
        </Tab.Navigator>
    )
}