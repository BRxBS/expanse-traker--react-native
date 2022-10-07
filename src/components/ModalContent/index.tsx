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

interface Props{

closeModalFunction: () => void;
children: ReactNode

}


export function Content({closeModalFunction, children}: Props){


    return(
        <Container>
        
        <ModalContent>
            {children}
        
        <CloseButton onPress={closeModalFunction} >
        <ButtonText>
            Fechar
        </ButtonText>
        </CloseButton>

       </ModalContent>

       </Container>
    )
}