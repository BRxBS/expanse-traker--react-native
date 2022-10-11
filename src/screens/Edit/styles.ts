import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";



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
export const Form = styled.View`
flex: 1;
width: 100%;
justify-content: space-between;
padding: 24px;

`
export const Fild = styled.View`

`
export const TransactionsTypes = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 8px;
margin-bottom: 16px;

`
export const TextInput = styled.TextInput`
width: 100%;
padding: 16px 18px;
font-family: ${({theme}) => theme.fonts.regular}; 
font-size:  ${RFValue(14)}px;

color: ${({theme}) => theme.colors.text_dark};
background-color: ${({theme}) => theme.colors.shape};
border-radius: 5px;
margin-bottom: 10px;

`;
