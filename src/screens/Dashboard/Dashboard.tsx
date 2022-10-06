import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { FlatList } from 'react-native';
import { View, Modal, Text } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import {useAuth} from '../../hooks/auth'
import { 
    Container,
    Header,
    UserInfo,
    LogoutButton,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    HighlightCards,
    Icon,
    Transactions,
    Title,
    LoadingCont,
    Wrapper,
    ModalText,
    CloseIcon

 } from "./styles";
import { Content } from "../../components/ModalContent";

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
    const [isLoading, setIsLoading] = useState(true)
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightDataProps>(
        {} as HighlightDataProps
      );
      
      const theme = useTheme()
      const {user, signOut} = useAuth()

      const {getItem, setItem} = useAsyncStorage(`@finance:transactions_user:${user.id}`)


      function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
      }


    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
      }


      
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

        const response = await getItem()
        const transactions = response ? JSON.parse(response) : [];
        console.log('response', response)
    
        let entriesTotal = 0;
        let expensiveTotal = 0;
 
        const transactionFormatted: DataListProps[] = transactions
        .map(({ amount, date, id, name, type, category }: DataListProps) => {
            
            if(type === 'positive'){
                entriesTotal += Number(amount);

            }else{
                expensiveTotal += Number(amount)
            }
            
            const amountFormatted = Number(amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
 
            const dateFormatted = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(date))

            return{

                
                id,
                name,
                amount: amountFormatted,
                date: dateFormatted,
                type,
                category,

            }
        })
       setTransaction(transactionFormatted);
       console.log('transactionFormatted', transactionFormatted)
       console.log('loadTransactions', loadTransactions)

         
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
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionsEntries === 0
            ? "Nao há transações."
            : `Última entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionsExpensives === 0
            ? "Não há transações."
            : `Última saída dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInverval,
      },
    });
    setIsLoading(false);
  }
//    console.log('HighlightData,', highlightData)
//   console.log('transaction,', transaction)

async function handleDeleteRegister(id: string){
  const response = await getItem()
  const previosData = response ? JSON.parse(response) : []; 


  const dataStorage = previosData.filter((item: DataListProps) => item.id !== id);
  setItem(JSON.stringify(dataStorage))
  console.log('dataStorage', dataStorage)
  setCategoryModalOpen(false)


}

    useFocusEffect(useCallback(() => {
        loadTransactions()

    },[]))

    useEffect(()=> {
      loadTransactions()
    },[categoryModalOpen])

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
                    <Photo source={{uri: user.picture }}/>
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>{user.given_name}</UserName>
                    </User>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                <Icon name="log-out"/>
                </LogoutButton>
                </UserWrapper>
            </Header>
      
            <HighlightCards
            >
               <HighlightCard 
                type='total'
                title="Total"
                amount={highlightData?.total?.amount}
                lastTransaction={highlightData.total.lastTransaction} />
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

                
            </HighlightCards>

            <Transactions>
            <Title>
                Listagem 
            </Title>

            <FlatList
                        data={transaction}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => <> 
                        <TransactionCard data={item} onPress={handleOpenSelectCategoryModal} />

                        <Modal
                        animationType="none"
                        transparent={true}
                        visible={categoryModalOpen}
                        >
                        <Content
                          closeModalFunction={handleCloseSelectCategoryModal}
                            >
                          <Wrapper onPress={() => handleDeleteRegister(item.id)}>
                         <ModalText>Excluir Registro </ModalText>
                         <CloseIcon name="trash-o" />
                         </Wrapper>
                            </Content>
            
                        </Modal>
                        </>
                      }
                        showsVerticalScrollIndicator= {false}
                        inverted={true}
            >

            </FlatList>
            


            </Transactions>
</>
}
        </Container>


    )
}