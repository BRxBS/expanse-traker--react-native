import React, {useState} from "react";
import { Input } from "../../components/Form/input";
import { Button } from "../../components/Form/button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import {
    Container,
    Header,
    Title,
    Form,
    Fild,
    TransactionsTypes
} from './styles'


export function Register(){
    const [transactionType, setTransactionType] = useState('')

    function handleTransactionTypeButtonType(type: "up" | "down"){
        setTransactionType(type)
    }
    return(
        <>
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>
            <Form>
            <Fild>
            <Input
        placeholder="Nome"/>
             <Input
        placeholder="Nome"/>

        <TransactionsTypes>
        <TransactionTypeButton
      title='Chegando'
        type='up' 
        onPress={() => handleTransactionTypeButtonType('up')}
        isActive={transactionType === 'up'}
        
        />
        <TransactionTypeButton
      title='Saindo'
        type='down'
        onPress={() => handleTransactionTypeButtonType('down')}
        isActive={transactionType === 'down'}
        />
        </TransactionsTypes>

            
            </Fild>

            <Button title="Enviar"/>
            </Form>
        </Container>
        </>
    )
}