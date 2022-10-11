import React, { useState} from "react";
import { Modal, 
        TouchableWithoutFeedback,
        Keyboard,
        Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";


import { Button } from "../../components/Form/button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import {
    Container,
    Header,
    Title,
    Form,
    Fild,
    TransactionsTypes,
    TextInput
} from './styles'
import { CategorySelect } from "../CategorySelect";

import type { StackScreenProps } from '@react-navigation/stack';
type StackParamList = {
  Listagem:  {
    params: object;
    merge: boolean;
    id: string;
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    date: string;
    category: string;
}
}

type Props = StackScreenProps<StackParamList, 'Listagem'>;

export function EditScreen({ route }: Props){

  const { id, name, amount, } = route.params;
  console.log('id', id, '', 'name', name, 'amount', amount )
  const routes = useRoute()
  console.log('routes.params', routes.params)

   const [dataName, setDataName] = useState('')
   const [dataAmount, setDataAmount] = useState('')


    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);

    const navigation = useNavigation()




    // const [Category, setCategory] = useState({
    //     key: "category",
    //     name: "Categoria",
    //   });

      function handleTransactionTypeSelect(type: "positive" | "negative"){
        setTransactionType(type)
      }

      function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
      }

      function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
      }

      const resgister = () => {

        navigation.navigate('Listagem',
        {id:id,
         name: dataName,
         amount:dataAmount,
}
        )
        try{
          //to clean the input filds
          setDataName(''),
          setDataAmount(''),
          setTransactionType('')
  
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
                    Edição
                </Title>
            </Header>
            <Form>
            <Fild>


            <TextInput
                    placeholder={name}
                    onChangeText={setDataName}
                    value={dataName} />
            <TextInput
                    placeholder={amount}
                    onChangeText={setDataAmount}
                    value={dataAmount} />


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


  
            </Fild>

            <Button title="Enviar" onPress={resgister}/>
            </Form>
            
        </Container>
        </TouchableWithoutFeedback>
        </>
    )
}