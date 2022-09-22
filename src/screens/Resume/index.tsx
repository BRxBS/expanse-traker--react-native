import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Container,
    Header,
    Title,
} from './styles'
import {HistoryCard} from '../../components/HistoryCard/index'
import { categorias } from "../../utils/categorias";

interface Props{
 title: string,

};
export interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string ;
    date: string;
}
export function Resume(){
    async function loadData() {
        const dataKey = '@finance:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];
    
        const expensives = responseFormatted.filter(
            (expensive: TransactionData) => expensive.type === 'negative');
        

            const totalByCategory = []

            categorias.forEach(category => {
                let categorySum = 0

            expensives.forEach((expensive: TransactionData) => {
                if(expensives.category === category.key){
                    categorySum += Number(expensive.amount)
                }
            })

            totalByCategory.push({
                name: category.name,
                total: categorySum
            })
              

            })
    console.log('totalByCategory',totalByCategory)
            
    }
    useEffect(() =>{
        loadData()
    }, [])

    return(
        <>
        <Container >
            <Header>
                <Title>Resumo por categoria </Title>
            </Header>
            <HistoryCard 
            title="hello"
            amount="10"
            color="red"/>
      
        </Container>
        </>
    )
}