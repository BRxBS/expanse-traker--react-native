import React from "react";
import { FlatList } from 'react-native';
import { categorias } from "../../utils/categorias";
import { Button } from "../../components/Form/button";


import {
    Container,
    Header,
    Title,
    Category,
    Name,
    Icon,
    Separator,
    Footer,


    
} from './styles'

interface Category {
    key: string;
    name: string;
  }
  

interface Props{
category: Category;
setCategory: (category: Category) => void;
closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory,
}: Props): JSX.Element{
    function handleCategorySelect(category: Category) {
        setCategory(category);
      }


    return(
        <>
        <Container >
            <Header>
            <Title>Categoria</Title>

            </Header> 
            
            <FlatList
            data={categorias}
            style={{ width: '100%'}}
            keyExtractor={(item) => item.key}
            renderItem={({item}) =>(
                <Category             
                onPress={() => handleCategorySelect(item)}
                isActive={category.key === item.key}>
                    <Name>{item.name}</Name>
                    <Icon name={item.icon} />
                </Category>
            )} 
            ItemSeparatorComponent={() => <Separator/>}/>
                
        <Footer>
            <Button title='Selecionar' onPress={closeSelectCategory}/>
        </Footer>
 
        </Container>
        </>
    )
}
