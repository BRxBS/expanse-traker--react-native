import React from 'react'

import {
    Container,
    ModalContent,
    ModalText,
    CloseIcon,
    CloseButton,
    ButtonText,
    EditIcon,
    Wrapper


} from "./styles";

interface Props{
onPress: () => void;
}

export function Content({onPress}: Props){
    return(
        <Container>
        
        <ModalContent>

        <Wrapper>
        <ModalText>Editar Registro  </ModalText>
        <EditIcon  name="edit"/>
        </Wrapper>

        <Wrapper>
             <ModalText>Excluir Registro </ModalText>
             <CloseIcon name="close" />

        </Wrapper>
        
        <CloseButton onPress={onPress} >
        <ButtonText>
            Fechar
        </ButtonText>
        </CloseButton>

       </ModalContent>

       </Container>
    )
}