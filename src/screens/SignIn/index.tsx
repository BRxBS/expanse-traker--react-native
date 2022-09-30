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
import { Alert } from "react-native";

interface Props {
 title: string,

};



export function SignIn(){

    const {signInWithGoogle} = useAuth()
    async function handleSignInWithGoogle(){
        try{
            await signInWithGoogle()
        }catch(error){
            console.log(error)
            Alert.alert('Não foi possivel conectar a sua conta ')
            
        }

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
            onPress={handleSignInWithGoogle}
            />

        </FooterWrapper>
        </Footer>
        </Container>
        </>
    )
}