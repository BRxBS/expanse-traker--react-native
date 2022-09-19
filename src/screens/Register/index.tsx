import React, {useState} from "react";
import { Modal, 
        TouchableWithoutFeedback,
        Keyboard,
        Alert } from "react-native";
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
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

interface FormData {
  name: string;
  amount: string
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatorio'),
  amount: yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo')
})

export function Register(){

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

    const {
      control,
      handleSubmit,
      formState: {errors}
    } = useForm({
      resolver: yupResolver(schema)
    });


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

      function handleRegister(form: FormData): void{
        if(!transactionType)
        return Alert.alert("Selecione o tipo da transação ")

        if(category.key === 'category')
        return Alert.alert("Selecione a categoris!")


        const data = {
          name: form.name,
          amount: form.amount,
          transactionType,
          category: category.key
        }
        console.log(data)
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