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

import * as AuthSession from 'expo-auth-session';

import { RFValue } from "react-native-responsive-fontsize";
import { SignInButton } from "../../components/SignSocialButton";

import {useAuth} from '../../hooks/auth'

interface Props {
 title: string,

};

type AuthResponse = {
    params: {
        access_token: string;

    };
    type: string
}

export function SignIn(){
    const data = useAuth()

    async function signInWithGoogle() {
        const CLIENT_ID = '83878190207-ur5m6t4ov5r0cl5od83tjgaisqban1pc.apps.googleusercontent.com'
        const REDIRECT_URI = 'https://auth.expo.io/@anonymous/finance-f0cf056c-c970-4d3f-8d8d-33f155b37c88'
        const RESPONSE_TYPE = 'token'
        const SCOPE = encodeURI('profile email')

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
        const {type, params} = await AuthSession
        .startAsync({ authUrl }) as AuthResponse
        console.log('type', type)
        console.log('params', params)

 
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
            onPress={signInWithGoogle}
            />

        </FooterWrapper>
        </Footer>
        </Container>
        </>
    )
}