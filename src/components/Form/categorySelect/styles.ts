import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

interface IconProps {
  }


export const Container = styled.View`
width: 100%;

margin-bottom: 10px;

`;



export const Category = styled.Text`

`;
export const Icon = styled(Feather)<IconProps>`
 font-size: ${RFValue(24)}px;
 margin-right: 8px;

`;