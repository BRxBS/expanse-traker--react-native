import React, { ReactNode } from 'react'

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

import { TransactionCardProps } from '../TransactionCard';

interface Props{

closeModalFunction: () => void;
children: ReactNode

}


export function Content({closeModalFunction, children}: Props){




    return(
        <Container>
        
        <ModalContent>
            {children}

        <Wrapper>
        <ModalText>Editar Registro  </ModalText>
        <EditIcon  name="edit"/>
        </Wrapper>

        
        <CloseButton onPress={closeModalFunction} >
        <ButtonText>
            Fechar
        </ButtonText>
        </CloseButton>

       </ModalContent>

       </Container>
    )
}