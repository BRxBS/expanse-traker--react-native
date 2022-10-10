export declare global {
    namespace ReactNavigation{
  export   interface RootParamList{
            Listagem:  {
                params: object;
                merge: boolean
            };
            Register: undefined;
            Resume:undefined;
            EditScreen: {
                id: string;
                type: 'positive' | 'negative';
                name: string;
                amount: string;
                category: string ;


            }
            
        }
    }
}