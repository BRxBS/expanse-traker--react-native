import React from "react";


import {
    Container,
    Category,
    Icon
    
} from './styles'

interface Props{
    title: string;
}

export function CategorySelect({title}: Props){
    return(
        <>
        <Container >
            <Category>Categoria</Category>
            <Icon name='chevron-down'/>
        </Container>
        </>
    )
}

