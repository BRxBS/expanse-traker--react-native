import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";

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
    LoadingCont

 } from "./styles";

export interface DataListProps extends TransactionCardProps{
    id: string;
  }

  interface HighlightProps {
    amount: string;
    lastTransaction: string;
  }
  interface HighlightDataProps {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;

  }

export function Dashboard(){
    const [isLoading, setIsLoadeing] = useState(true)
    const [transaction, setTransaction] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightDataProps>(
        {} as HighlightDataProps
      );

    const theme = useTheme()

    function getLastTransactionDate(
        collection: DataListProps[],
        type: "positive" | "negative"
      ) {
        const collectionFiltered = collection.filter(
          (transaction) => transaction.type === type
        );
        if (collectionFiltered.length == 0) return 0;
        const lastTransaction = new Date(
          Math.max.apply(
            Math,
            collectionFiltered.map((transaction) =>
              new Date(transaction.date).getTime()
            )
          )
        );
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
          "pt-BR",
          {
            month: "long",
          }
        )}`;
      }
    
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
       setTransaction(transactionFormatted);

         
       const lastTransactionsEntries = getLastTransactionDate(
        transactions,
        "positive"
      );
      const lastTransactionsExpensives = getLastTransactionDate(
        transactions,
        "negative"
      );

    const totalInverval =
    lastTransactionsExpensives === 0
      ? "Não há transações."
      : `01 a ${lastTransactionsExpensives}`;


        const total = entriesTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:
                lastTransactionsEntries === 0
                  ? "Nao há transações."
                  : `Última entrada dia ${lastTransactionsEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:
                lastTransactionsExpensives === 0
                  ? "Não há transações."
                  : `Última saída dia ${lastTransactionsExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInverval,
            }
        })
        setIsLoadeing(false)
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
{ isLoading ? <LoadingCont> 
                <ActivityIndicator
                color={theme.colors.secundary}
                size='large'
                />
               </LoadingCont> 
            : 
<>
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
                amount={highlightData?.entries?.amount} //optional chaning
                lastTransaction={highlightData.entries.lastTransaction} />
                <HighlightCard 
                 type='down'
                 title= 'Saídas'
                 amount={highlightData?.expensives?.amount}
                lastTransaction={highlightData.expensives.lastTransaction} />
                <HighlightCard 
                type='total'
                title="Total"
                amount={highlightData?.total?.amount}
                lastTransaction={highlightData.total.lastTransaction} />
                
            </HighlightCards>

            <Transactions>
            <Title>
                Listagem 
            </Title>

            
            <FlatList
                        data={transaction}
                        renderItem={({item}) => <TransactionCard data={item} />}
                        showsVerticalScrollIndicator= {false}
                       
            >

            </FlatList>
            

            </Transactions>
</>
}
        </Container>


    )
}