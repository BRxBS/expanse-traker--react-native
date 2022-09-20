import React from "react";
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

export interface DataListProps extends TransactionCardProps{
    id: string;
  }

export function Dashboard(){
    const data: DataListProps [] = [
        
        {
        id: '1',
        type: 'positive',
         title: 'Desenvolvimento de site',
         amount: 'R$ 10.000.00',
        category:{
            name: "vendas",
            icon: 'dollar-sign'
        },
        date:'13/04/2022'},

       {
            id: '2',
            type: 'negative',
            title: 'Desenvolvimento de site',
        amount: 'R$ 10.000.00',
       category:{
           name: "vendas",
           icon: 'dollar-sign'
       },
       date:'13/04/2022'},

       {
        id: '3',
        type: 'positive',
        title: 'Desenvolvimento de site',
       amount: 'R$ 10.000.00',
      category:{
          name: "vendas",
          icon: 'dollar-sign'
      },
      date:'13/04/2022'}, 
    ]

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
                amount="R$ 1.000.00"
                lastTransaction="Ultima entrada dia 13 de abril" />
                <HighlightCard 
                 type='down'
                 title="Saídas"
                 amount="R$ 100.00"
                lastTransaction="Ultima entrada dia 10 de abril"/>
                <HighlightCard 
                type='total'
                 title="Total"
                 amount="R$ 1.000.00"
                lastTransaction="01 á 16 de abril"/>
                
            </HighlightCards>

            <Transactions>
            <Title>
                Listagem 
            </Title>


 
            
            <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <TransactionCard data={item} />}
                        showsVerticalScrollIndicator= {false}
            >

            </FlatList>
            

            </Transactions>

        </Container>


    )
}