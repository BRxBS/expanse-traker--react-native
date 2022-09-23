import React from "react";
import { categorias } from "../../utils/categorias";

import {
     Container,
     Icon,
     Title,
     Footer,
     Amount,
     CategoryName,
     Date,
     Category
 
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
    const [ category ] = categorias.filter(
        (item) => item.key === data.category
    );
    
    return(
        <Container>
            <Title>{data.name}</Title>

            <Amount type={data.type}>        
            {data.type === "negative" && "- "}
            {data.amount}
          </Amount>

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