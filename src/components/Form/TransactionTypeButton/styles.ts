import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

interface IconProps {
    type: "up" | "down" ;
  }

interface TransactionProps {
    isActive: boolean;
    type: "up" | "down" ;
  }

export const Container = styled.TouchableOpacity<TransactionProps>`
width: 48%;
padding: 16px 20px;
flex-direction: row;
align-items: center;



border-width: ${({isActive}) => isActive ? 0 : 1.5}px ;
border-style: solid;
border-color: ${({ theme }) => theme.colors.text};
border-radius: 5px;

${({isActive, type}) => isActive && type === 'up' && css`
      background-color: ${({ theme }) => theme.colors.success_light};
   `};
${({isActive, type}) => isActive && type === 'down' && css`
      background-color: ${({ theme }) => theme.colors.attention_light};
   `};


`;
export const Title = styled.Text`
font-size:   ${RFValue(14)}px;
font-family: ${({theme}) => theme.fonts.medium}; 


`
export const Icon = styled(Feather)<IconProps>`
 font-size: ${RFValue(24)}px;
 margin-right: 8px;

color: ${({theme, type}) =>
        type === 'up' ? theme.colors.success :theme.colors.attention  }
`;
