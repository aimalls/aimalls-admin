import { FC, SetStateAction, useEffect, useState } from "react";
import { iTextInput } from "../AddCustomField";
import { IonInput, IonSelect, IonSelectOption, IonText } from "@ionic/react";

export interface iProps {
    onGenerate: (field: iTextInput) => void
}
export const TextInput: FC<iProps> = ({ onGenerate }): JSX.Element => {
    const defaultValue = {
        fieldType: "text",
        value: "",
        fill: "outline",
        placeholder: "",
        labelPlacement: "floating",
        label: "",
        formControlName: "",
        type: "text"
    } as iTextInput

    const [textInput, setTextInput] = useState(defaultValue)

    useEffect(() => {
        onGenerate(textInput)
    }, [textInput])
    

    const handleFormChange = (field: keyof typeof defaultValue, value: any)  => {
        let current: iTextInput = {...textInput};
        
        current[field] = value as never;
        setTextInput(c => c = current)
        
    }
    
    return (
        <>
            <IonInput label="Form Control Name" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={textInput.formControlName}  fill="outline"
                onIonChange={(val) => handleFormChange('formControlName', val.detail.value)} 
            ></IonInput>
            <IonSelect label="Type" style={{ marginBottom: "10px" }} fill="outline" value={textInput.type} onIonChange={(e) => handleFormChange("type", e.detail.value)}>
                <IonSelectOption value="text">Text</IonSelectOption>
                <IonSelectOption value="number">Number</IonSelectOption>
                <IonSelectOption value="email">Email</IonSelectOption>
                <IonSelectOption value="search">Search</IonSelectOption>
                <IonSelectOption value="password">Password</IonSelectOption>
            </IonSelect>
            <IonSelect label="Fill" style={{ marginBottom: "10px" }} fill="outline" value={textInput.fill} onIonChange={(e) => handleFormChange("fill", e.detail.value)}>
                <IonSelectOption value="outline">Outline</IonSelectOption>
                <IonSelectOption value="solid">Solid</IonSelectOption>
            </IonSelect>
            <IonInput label="Placeholder" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={textInput.placeholder} fill="outline"
                onIonChange={(val) => handleFormChange('placeholder', val.detail.value)} 
            ></IonInput>
            <IonInput label="Label" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={textInput.label}  fill="outline"
                onIonChange={(val) => handleFormChange('label', val.detail.value)} 
            ></IonInput>
        </>
    )
};
export default TextInput;