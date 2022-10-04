import React, {useEffect, useState} from "react";
import { Modal, 
        TouchableWithoutFeedback,
        Keyboard,
        Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import uuid from 'react-native-uuid'
import { useNavigation } from "@react-navigation/native";

import { InputFormHook } from "../../components/Form/inputFormHook";
import { Button } from "../../components/Form/button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import {
    Container,
    Header,
    Title,
    Form,
    Fild,
    TransactionsTypes
} from './styles'
import { CategorySelect } from "../CategorySelect";
import { useAuth } from "../../hooks/auth";

interface FormData {
  name: string;
  amount: string
}

const schema = yup.object().shape({
  name: yup.string()
  .required('Nome é obrigatorio'),
  amount: yup.number()
  .typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
  .required('Nome é obrigatorio'),
})

export function Register(){

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

    const {user} = useAuth()

    const navigation = useNavigation()

    const {
      control,
      handleSubmit,
      reset,
      formState: {errors}
    } = useForm({
      resolver: yupResolver(schema)
    });


    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
      });

      function handleTransactionTypeSelect(type: "positive" | "negative"){
        setTransactionType(type)
      }

      function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
      }

      function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
      }

async  function handleRegister({ name, amount }: FormData){
        const dataKey = `@finance:transactions_user:${user.id}`;
        if(!transactionType)
        return Alert.alert("Selecione o tipo da transação")

        if(category.key === 'category')
        return Alert.alert("Selecione a categoria")


        const newTransaction = {
          id: String(uuid.v4()),
          name,
          amount,
          type: transactionType,
          category: category.key,
          date: new Date()
        };

        try{

          const data = await AsyncStorage.getItem(dataKey)
          const currentData = data ? JSON.parse(data) : [];
          const dataFormatted = [  ...currentData, newTransaction]
          
          await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
         
          //to clean the input filds
          reset()
          setTransactionType(''),
          setCategory({
            key: "category",
            name: "Categoria",
          })
          navigation.navigate('Listagem')
     
        }catch(error) {
          console.log("erro em salvar transação", error);
          Alert.alert("Não foi possível salvar")
        }
      }


      
    return(
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>
            <Form>
            <Fild>

            <InputFormHook
            name='name'
            control={control}
            placeholder='Nome'
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name?.message}
            />

            <InputFormHook
            name='amount'
            control={control}
            placeholder='Valor'
            keyboardType="numeric"
            error={errors.amount?.message}
            />


        <TransactionsTypes>
        <TransactionTypeButton
      title='Chegando'
        type='up' 
        onPress={() => handleTransactionTypeSelect("positive")}
        isActive={transactionType === 'positive'}
        
        />
        <TransactionTypeButton
      title='Saindo'
        type='down'
        onPress={() => handleTransactionTypeSelect( "negative")}
        isActive={transactionType === 'negative'}
        />
        </TransactionsTypes>

        <CategorySelectButton 
        title={category.name}
        onPress={handleOpenSelectCategoryModal}
        />

  
            </Fild>

            <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
            </Form>
            
            <Modal visible={categoryModalOpen}>
             
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
        </Container>
        </TouchableWithoutFeedback>
        </>
    )
}