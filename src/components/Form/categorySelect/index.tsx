import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from '@expo/vector-icons';


import {
    Container,
    Category,
    Icon
    
} from './styles'

type Props = TextInputProps;

export function CategorySelect(){
    return(
        <>
        <Container >
            <Category></Category>
            <Icon name='chevron-down'/>
        </Container>
        </>
    )
}

