import React from "react";
import { Entypo } from '@expo/vector-icons'; 
import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    HighlightCards,
    Icon

 } from "./styles";
import { HighlightCard } from "../../components/HighlightCard";


export function Dashboard(){
    return(

      
        <Container>

            <Header>
                <UserWrapper>
                <UserInfo>
                    <Photo source={{uri: 'https://picsum.photos/200' }}/>
                    <User>
                        <UserGreeting>Olá, </UserGreeting>
                        <UserName>Name</UserName>
                    </User>
                </UserInfo>
                  <Icon name="log-out"/>
                </UserWrapper>
            </Header>
      
            <HighlightCards
            >
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
                
            </HighlightCards>
        </Container>


    )
}