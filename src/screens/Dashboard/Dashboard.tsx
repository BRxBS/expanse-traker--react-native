import React, { useCallback, useEffect, useState } from "react";
import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    HighlightCards,
    Icon,
    Transactions,
    Title,

 } from "./styles";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps{
    id: string;
  }

  interface HighlightProps {
    amount: string;
  }
  interface HighlightDataProps {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
  }

export function Dashboard(){
    const [transaction, setTransaction] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightDataProps>(
        {} as HighlightDataProps
      );


    async function loadTransactions(){
        const dataKey = '@finance:transactions';
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : [];
    

        let entriesTotal = 0;
        let expensiveTotal = 0;
 
        const transactionFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            
            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);

            }else{
                expensiveTotal += Number(item.amount)
            }
            
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
 
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return{
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,

            }
        })
        const total = entriesTotal - expensiveTotal;
        setTransaction(transactionFormatted);
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        })
        console.log('transactionFormatted', transactionFormatted)
    }
  
    console.log('HighlightData,', highlightData)

    useEffect(() => {
        loadTransactions()
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions()
    },[]))

    return(

      
        <Container>

            <Header>
                <UserWrapper>
                <UserInfo>
                    <Photo source={{uri: 'https://picsum.photos/200' }}/>
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>Name</UserName>
                    </User>
                </UserInfo>
                  <Icon name="log-out"/>
                </UserWrapper>
            </Header>
      
            <HighlightCards
            >
                <HighlightCard
                type='up'
                title="Entrada"
                amount='0'
                lastTransaction="Ultima entrada dia 13 de abril" />
                <HighlightCard 
                 type='down'
                 title='Saídas'
                 amount='0'
                lastTransaction="Ultima entrada dia 10 de abril"/>
                <HighlightCard 
                type='total'
                 title="Total"
                 amount={highlightData.total.amount}
                lastTransaction="01 á 16 de abril"/>
                
            </HighlightCards>

            <Transactions>
            <Title>
                Listagem 
            </Title>

            
            <FlatList
                        data={transaction}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <TransactionCard data={item} />}
                        showsVerticalScrollIndicator= {false}
            >

            </FlatList>
            

            </Transactions>

        </Container>


    )
}