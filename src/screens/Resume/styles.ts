import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons'; 



export const Container = styled.View`
width: 100%;
height: 100%;
background-color:  ${({theme}) => theme.colors.background}; 



`;

export const Header = styled.View`
width: 100%;
height: ${RFValue(113)}px;

background-color: ${({theme}) => theme.colors.primary};

align-items: center;
justify-content: flex-end;
padding-bottom: 19px;

`
export const Title = styled.Text`
font-size:   ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.regular}; 
color:  ${({theme}) => theme.colors.shape}; 

`

export const Content = styled.ScrollView``;


export const ChartContainer = styled.View`
width: 100%;
align-items: center;

`;
export const MonthSelect = styled.View`
width: 100%;

flex-direction: row;
justify-content: space-between;
align-items: center;

margin-top: 20px;

`;
export const MonthSelectButton = styled.TouchableOpacity`


`;
export const SelectIcon = styled(Feather)`
font-size:   ${RFValue(24)}px;
`
export const Month = styled.Text`
font-size:   ${RFValue(20)}px;
font-family: ${({theme}) => theme.fonts.regular}; 



`;
export const LoadingContainer = styled.View`
width: 100%;
height: 100%;
background-color:  ${({theme}) => theme.colors.background}; 



`;
