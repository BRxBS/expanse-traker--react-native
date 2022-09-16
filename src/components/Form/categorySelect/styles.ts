import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

interface IconProps {
  }


export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
width: 100%;
padding: 18px 16px;
background-color: ${({theme}) => theme.colors.shape};

flex-direction: row;
justify-content: space-between;
align-items: center;

border-radius: 5px;


`;



export const Category = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`;
export const Icon = styled(Feather)<IconProps>`
 font-size: ${RFValue(20)}px;
color: ${({theme}) => theme.colors.text};


`;