import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//${RFValue(14)}px;
//${RFPercentage(16)}px;

interface  TransactionCardProps{
    type: 'positive' | 'negative'

}

export const Container = styled.View`
background: ${({theme}) => theme.colors.shape};
border-radius: 5px;

padding: 17px 24px;;
margin-bottom: 16px;
`
export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
`
export const ButtonToOpenModal = styled.TouchableOpacity`
width: ${RFValue(25)}px; 
height: ${RFValue(25)}px;

`;
export const IconOptions = styled(SimpleLineIcons)`
margin-left:  ${RFValue(15)}px; 
font-size: ${RFValue(12)}px; 
color: ${({theme}) => theme.colors.text_dark};
`

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px; 

`
export const Amount = styled.Text<TransactionCardProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(20)}px; 
color: ${({theme, type}) => 
type === 'positive' ? theme.colors.success : theme.colors.attention};
margin-top: 2px

`
export const Footer = styled.View`
flex: 1;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 19px;
`

export const Icon = styled(Feather)`
font-size: ${RFValue(20)}px; 
color: ${({theme}) => theme.colors.text};
`
export const CategoryName = styled.Text`
font-size: ${RFValue(14)}px; 
color: ${({theme}) => theme.colors.text};
margin-left: 10px;

`
export const Date = styled.Text`
font-size: ${RFValue(14)}px; 
color: ${({theme}) => theme.colors.text};

`
export const Category = styled.View`
flex-direction:  row;
align-items: center;
`

