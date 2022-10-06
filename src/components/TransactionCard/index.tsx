import React, { useState } from "react";
import { categorias } from "../../utils/categorias";
import { View, Modal, Text } from "react-native";
import { Content } from "../ModalContent";

import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {useAuth} from '../../hooks/auth'
import {
     Container,
     Header,
     ButtonToOpenModal, 
     IconOptions,
     Icon,
     Title,
     Footer,
     Amount,
     CategoryName,
     Date,
     Category,

 
 } from "./styles";


export interface TransactionCardProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string ;
    date: string;
}


interface Props {
data: TransactionCardProps;
onPress:  () => void;

}

 export function TransactionCard({data, onPress}: Props): JSX.Element{

const [ category ] = categorias.filter(
        (item) => item.key === data.category
    );


    return(
        <Container>
            <Header>
            <View>
            <Title>{data.name}</Title>

            <Amount type={data.type}>        
            {data.type === "negative" && "- "}
            {data.amount}
            </Amount>
            </View>

            <ButtonToOpenModal  onPress={onPress}>

            <IconOptions name="options-vertical"/>
            </ButtonToOpenModal>

            </Header>

            <Footer>
         
                <Category>
                <Icon name={category.icon}/>
                 <CategoryName>{category.name}</CategoryName>
                </Category>
 
                <Date>{data.date}</Date>
      
            </Footer>
        </Container>
    )
 }