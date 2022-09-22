import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface Props {
    color: string,
   };
   

export const Container = styled.View<Props>`
width: 90%;
padding: 13px 24px;
margin-bottom: 0px;
margin: 0  5%;
background-color:  ${({theme}) => theme.colors.shape}; 

flex-direction: row;
justify-content: space-between;

border-radius: 5px;
border-left-width: 5px;
border-left-color: ${({color}) => color}; 

`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;

`;
export const Amount = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;

`;