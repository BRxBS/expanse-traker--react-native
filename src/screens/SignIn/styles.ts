import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";



export const Container = styled.View`
flex: 1;


`;
export const Header = styled.View`
width: 100%;
height: 70%;

background-color: ${({theme}) => theme.colors.primary};
justify-content: flex-end;
align-items: center;

`
export const TitleWrapper = styled.View`
align-items: center;


`
export const Title = styled.Text`
font-family:  ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(30)}px;
color: ${({theme}) => theme.colors.shape};

text-align: center;


`
export const SingInTitle = styled.Text`
font-family:  ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(16)}px;
color: ${({theme}) => theme.colors.shape};

text-align: center;
margin-top: ${RFValue(80)}px;
margin-bottom: ${RFValue(60)}px ;

`
export const Footer = styled.View`
width: 100%;
height: 30%;

background-color: ${({theme}) => theme.colors.background};

`
export const FooterWrapper = styled.View`
margin-top: ${RFValue(-20)}px;
padding: 0 32px;

justify-content: space-between;

`
