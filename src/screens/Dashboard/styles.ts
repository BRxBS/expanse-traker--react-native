import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 


export const Container = styled.View`

background-color: ${({theme}) => theme.colors.background};
height: 100%;
width: 100%

`;

export const Header = styled.View`
width: 100%;
height: ${RFPercentage(38)}px;

background-color: ${({theme}) => theme.colors.primary};

justify-content: center;
align-items: flex-start;
flex-direction: row;

`
export const UserWrapper = styled.View `
width: 100%;
padding: 0 24px;
margin-top: 20px;

flex-direction: row;
justify-content: space-between;
align-items: center;
   
`;

export const UserInfo = styled.View `
    flex-direction: row;
    align-items: center;
`;
export const LogoutButton = styled.TouchableOpacity`
`
    
export const Icon =  styled(Entypo) `
color: ${({theme}) => theme.colors.text_dark};
font-size: ${RFValue(24)}px;
   
`;
export const Photo = styled.Image `
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    
    border-radius: 10px;
`;

export const User = styled.View `
margin-left: 17px;
   
`;


export const UserGreeting = styled.Text `
color: ${({theme}) => theme.colors.shape};

font-size:  ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.regular}; 
    `;

export const UserName = styled.Text `
color: ${({theme}) => theme.colors.shape};

font-size:  ${RFValue(18)}px;
font-family: ${({theme}) => theme.fonts.bold}; 

    `;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 14},
})`
width: 100%;

position: absolute;
margin-top:  ${RFPercentage(16)}px;

`
export const Transactions = styled.View`
flex: 1%;
padding: 0 22px;
margin-top: ${RFPercentage(10)}px;


`
export const Title = styled.Text`
font-size:   ${RFValue(20)}px;
font-family: ${({theme}) => theme.fonts.medium}; 
margin-bottom: ${RFPercentage(1)}px;

`
export const LoadingCont = styled.View`

`

export const Wrapper = styled.TouchableOpacity`
margin-bottom: 5px;
padding: ${RFValue(15)}px ;
flex-direction: row;
justify-content: space-between;
align-items: center;

`
export const ModalText = styled.Text`
font-size: ${RFValue(18)}px; 
flex-direction: row;
justify-content: space-between;

`
export const CloseIcon = styled(FontAwesome)`
font-size: ${RFValue(20)}px; 
color: ${({theme}) => theme.colors.text_dark};
`
export const EditIcon = styled(FontAwesome)`
font-size: ${RFValue(20)}px; 
color: ${({theme}) => theme.colors.text_dark};
`
export const ButtonNavigate = styled.TouchableOpacity`

`