import { IonGrid, IonInput, IonItemOption, IonSelect, IonSelectOption } from "@ionic/react";
import { FC } from "react";






export interface FormField {
    icon?: React.ReactNode,
    formName: string,
    title?: string,
    label?: string,
}


export interface SelectFormFieled extends FormField {
    options: Object[]
}

export type FieldType = LooseAutoComplete<"text" | "textarea" | "select" | "number" | "email"> 


export type LooseAutoComplete<T extends string> = T | Omit<string, T>

export interface iProps {
    type: FieldType,
    value: string,
    fn(v: string): string
}

export const CustomerFormGenerator: FC<iProps> = ({ type, value, fn }): JSX.Element => {

    

    return (
        <>
            {
                type == 'text' ? (
                    <>
                        <IonInput
                            type='password' 
                            label='Password' 
                            className='inputs ion-margin-bottom' 
                            labelPlacement="floating"
                            placeholder='Enter your Password'
                            value={value}
                            required
                            onIonChange={(val) => fn(val.detail.value!)}
                        />
                    </>
                ) : (
                    <></>
                )
            }  
        </>
    )
};
export default CustomerFormGenerator;