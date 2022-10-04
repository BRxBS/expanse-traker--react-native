import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { VictoryPie } from 'victory-native'
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {addMonths, subMonths, format} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useFocusEffect } from "@react-navigation/native";

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    Month,
    SelectIcon,
    LoadingContainer
} from './styles'

import {HistoryCard} from '../../components/HistoryCard/index'
import { categorias } from "../../utils/categorias";
import { useAuth } from "../../hooks/auth";



export interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string ;
    date: string;
}

interface CategoryData{
    key: string
    name: string;
    total: string;
    totalFormatted: string;
    color: string;
    percentFormatted: string;
    percent:number;
   
   };


   export function Resume(){
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [totalCategories, setTotalCategories] = useState<CategoryData[]>([])
    
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme()
    const {user} = useAuth()

    function handleDateChange(action: "previous" | "next"){
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1))
    
        }else{
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    async function loadData() {
        setIsLoading(true);

        const dataKey = `@finance:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];
    
        const expensives = responseFormatted.filter(
            ({ type, date }: TransactionData ) => 
            type === 'negative'  &&
            new Date(date).getMonth() === selectedDate.getMonth() &&
            new Date(date).getFullYear() === selectedDate.getFullYear()
            );
        
            const expensivesTotal = expensives.reduce(
                (accumulator: number, expensive: TransactionData) => {
                  return accumulator + Number(expensive.amount);
                },
                0
              );
          
              const totalByCategory: CategoryData[] = [];
          
              categorias.forEach(({ key, name, color }) => {
                let categorySum = 0;
                expensives.forEach(({ category, amount }: TransactionData) => {
                  if (category === key) {
                    categorySum += Number(amount);
                  }
                });
                if (categorySum > 0) {
                  const totalFormatted = categorySum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  });
                  const percent = (categorySum / expensivesTotal) * 100;
                  const percentFormatted = `${percent.toFixed(0)}%`;
                
            totalByCategory.push({
                    key,
                    name,
                    total: String(categorySum),
                    totalFormatted,
                    color, 
                    percent,
                    percentFormatted
      
                  });
            }
              

            })
            setTotalCategories(totalByCategory)
            setIsLoading(false);
    console.log('totalByCategory',totalByCategory)
    console.log('responseFormatted',responseFormatted)
    console.log('expensives',expensives)
 }
    console.log('selectedDate',selectedDate)

    useFocusEffect(
        useCallback(() => {
          loadData();
        }, [selectedDate])
      );


    return(
        <>
        <Container >
        <Header>
                <Title>Resumo por categoria </Title>
        </Header>
 { isLoading ?   (         
            <LoadingContainer>
            <ActivityIndicator
            color={theme.colors.secundary}
             size='large'

            />
            </LoadingContainer> 
            
        ) : ( 
            <Content
            showVerticalScrollIndicator={false}
            contentContainerStyle={ {
                paddingHorizontal: 24, 
                paddingBottom: useBottomTabBarHeight(),
            }}
            >
                    <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('previous')}>
                        < SelectIcon name='chevron-left'/>
                    </MonthSelectButton>

                    <Month>
                        {format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
                    </Month>

                    <MonthSelectButton onPress={() => handleDateChange('next')}>
                        < SelectIcon name='chevron-right' />
                    </MonthSelectButton>

                    </MonthSelect>
    
    
            <ChartContainer>
            <VictoryPie
            colorScale={totalCategories.map(category => category.color)}
            style={{
                labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                }
            }}
            data={totalCategories}  
            labelRadius={70}
            x='percentFormatted' //name
            y='total'   //size
            />

            </ChartContainer>
 
            {
            totalCategories.map(({ name, color, key, totalFormatted }) => (
            <HistoryCard
              key={key}
              title={name}
              color={color}
              amount={totalFormatted}
            />
          ))}
            </Content>
)
}
        </Container>
        </>
    )
}