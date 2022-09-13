import React from "react";
import { Feather } from '@expo/vector-icons';
import { 
    Container,
    Header,
    TiTle,
    Footer,
    Amount,
    LastTransaction,
    Icon

 } from "./styles";
 import { StatusBar, Text, View } from 'react-native';

 export function HighlightCard(){
    return (
        <Container>
            <Header>
                <TiTle>Entrada</TiTle>
                <Icon name='arrow-up-circle'/>
            </Header>
            <Footer>
                <Amount>R$ 10000.00 </Amount>
                <LastTransaction>
                    última entrada dia 13 de abril
                </LastTransaction>
            </Footer>
        </Container>


    )
 }
