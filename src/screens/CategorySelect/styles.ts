import styled from "styled-components/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather} from '@expo/vector-icons';

interface CategoryProps {
    isActive: boolean
  }
  


export const Container = styled(GestureHandlerRootView)`
background-color:${({theme}) => theme.colors.shape};


`;

export const Header = styled.View`
width: 100%;
height: ${RFValue(113)}px;
background-color:${({theme}) => theme.colors.primary};

align-items: center;
justify-content: flex-end;
padding-bottom: 19px;
  
  `;

  
export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
color: ${({theme}) => theme.colors.shape};
font-size:  ${RFValue(18)}px;

`;

export const Category = styled.TouchableOpacity<CategoryProps>`

width: 100%;
padding: ${RFValue(15)}px; 
flex-direction: row;
align-items: center;
justify-content: space-between;

background-color: ${({ isActive, theme }) => isActive ? theme.colors.secundary : theme.colors.background};

`;

export const Icon = styled(Feather)`
 font-size: ${RFValue(20)}px;
 margin-right: 14px;


`;

export const Name = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size:  ${RFValue(14)}px;
`;

export const Separator = styled.View`
height: 1.5px;


background-color: #c8cee3;

`
export const Footer = styled.View`
width: 100%;
margin-top:  ${RFValue(170)}px; ;
padding: 24px;
`;
