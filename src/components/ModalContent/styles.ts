import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 

export const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;


`

export const ModalContent = styled.View`
padding:${RFValue(18)}px; 

width: 70%;
height: 30%;
background-color: ${({theme}) => theme.colors.shape};
border-radius: 8px;

justify-content: center;
align-items: center;

border: 2px;
border-color:  ${({theme}) => theme.colors.background};
`

export const ModalText = styled.Text`
font-size: ${RFValue(18)}px; 
flex-direction: row;
justify-content: space-between;

`
export const Wrapper = styled.TouchableOpacity`
margin-bottom: 5px;
padding: ${RFValue(15)}px ;
flex-direction: row;
justify-content: space-between;
align-items: center;



`

export const EditIcon = styled(FontAwesome)`
font-size: ${RFValue(20)}px; 
color: ${({theme}) => theme.colors.text_dark};
`

export const CloseIcon = styled(AntDesign)`
font-size: ${RFValue(20)}px; 
color: ${({theme}) => theme.colors.text_dark};
`

export const CloseButton = styled.TouchableOpacity`
border-radius: 8px;
background-color: ${({theme}) => theme.colors.secundary};
justify-content: center;
align-items: center;
height: 30%;
width: 70%;
margin-top: ${RFValue(8)}px; 

`

export const ButtonText = styled.Text`
color:  ${({theme}) => theme.colors.background};
font-family:  ${({theme}) => theme.fonts.medium};

padding: ${RFValue(15)}px ;
font-size: ${RFValue(15)}px; 


`
