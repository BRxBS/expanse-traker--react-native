import React, {useState} from "react";
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";


import { Input } from "../../components/Form/input";
import { Button } from "../../components/Form/button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../../components/Form/categorySelect"; 

import {
    Container,
    Header,
    Title,
    Form,
    Fild,
    TransactionsTypes
} from './styles'


export function Register(){

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);


    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
      });

      function handleTransactionTypeSelect(type: "up" | "down"){
        setTransactionType(type)
      }

      function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
      }

      function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
      }

      function handleRegister(){
        const data ={
            name,
            amount,
            transactionType,
            category: category.key
        }
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
        placeholder="Valor"/>

        <TransactionsTypes>
        <TransactionTypeButton
      title='Chegando'
        type='up' 
        onPress={() => handleTransactionTypeSelect('up')}
        isActive={transactionType === 'up'}
        
        />
        <TransactionTypeButton
      title='Saindo'
        type='down'
        onPress={() => handleTransactionTypeSelect('down')}
        isActive={transactionType === 'down'}
        />
        </TransactionsTypes>

        <CategorySelectButton 
        title={category.name}
        onpress={handleOpenSelectCategoryModal}
        />

  
            </Fild>

            <Button title="Enviar"
            onPress={handleRegister}/>
            </Form>
            
            <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
        </Container>
        </>
    )
}