import React from "react";

import {
     Container,
     Icon,
     Title,
     Footer,
     Amount,
     Category,
     CategoryName,
     Date
 
 } from "./styles";

export interface CategoryPros  {
name: string;
icon: string;
 }

export interface TransactionCardProps {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: CategoryPros  ;
    date: string;
}


interface Props {
data: TransactionCardProps
}



 export function TransactionCard({data}: Props){
    
    return(
        <Container>
            <Title>{data.title}</Title>

            <Amount type={data.type}>        
            {data.type === "negative" && "- "}
            {data.amount}
          </Amount>

            <Footer>
                <Category>
                    <Icon name={data.category.icon}/>
                    <CategoryName>{data.category.name}</CategoryName>
                    <Date>{data.date}</Date>
                </Category>
            </Footer>
        </Container>
    )
 }