import React from "react";

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SingInTitle,
    Footer,
    FooterWrapper
} from './styles'
import GoogleLogo from '../../assets/googleLogo.svg'
import FinançasLogo from '../../assets/FinançasLogo.svg'



import { RFValue } from "react-native-responsive-fontsize";
import { SignInButton } from "../../components/SignSocialButton";

import {useAuth} from '../../hooks/auth'
import { useNavigation } from "@react-navigation/native";

interface Props {
 title: string,

};



export function SignIn(){
    const navigation = useNavigation();
    const data = useAuth()

    function sign(){
        return(1+1)
    }

    return(
        <>
        <Container >

        <Header>
        <TitleWrapper>
            <Title>Controle</Title>
        <FinançasLogo
                    width={RFValue(150)} 
                    height={RFValue(150)}
         />

        <Title>
             de forma {'\n'}
              muito simples.
        </Title>

        <SingInTitle>
            Faça seu login abaixo.
        </SingInTitle>
        </TitleWrapper>
        </Header>

        <Footer>
        <FooterWrapper>
        <SignInButton
            title="Entrar com Google"
            svg={GoogleLogo}
            onPress={sign}
            />

        </FooterWrapper>
        </Footer>
        </Container>
        </>
    )
}