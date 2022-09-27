import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

import {
    Button,
    Title,
    ImageContainer
} from './styles'

interface PropsSignIn extends TouchableOpacityProps{
    title: string,
    svg: React.FC<SvgProps>,
    onPress: () => void;
   };


export function SignInButton({title, svg: Svg, onPress, ...rest } : PropsSignIn){
    return(
        <>
        <Button  onPress={onPress} {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>
            <Title>{title}</Title>
        </Button>
        </>
    )
}