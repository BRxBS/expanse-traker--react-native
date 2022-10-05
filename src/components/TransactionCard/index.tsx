import React, { useState } from "react";
import { categorias } from "../../utils/categorias";
import { View, Modal, Text } from "react-native";
import { Content } from "../ModalContent";

import {
     Container,
     Header,
     Button, 
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
data: TransactionCardProps
}



 export function TransactionCard({data}: Props): JSX.Element{
const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

    const [ category ] = categorias.filter(
        (item) => item.key === data.category
    );

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
      }

      function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
      }
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

            <Button  onPress={handleOpenSelectCategoryModal}>
            <Modal
            animationType="none"
            transparent={true}
            visible={categoryModalOpen}
            >
                <Content
                onPress={handleCloseSelectCategoryModal}
                />

            </Modal>
            <IconOptions name="options-vertical"/>
            </Button>

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