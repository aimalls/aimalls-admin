import { FC, SetStateAction, useEffect, useState } from "react";
import { iTextInput, iTextarea } from "../AddCustomField";
import { IonInput, IonSelect, IonSelectOption, IonText } from "@ionic/react";

export interface iProps {
    onGenerate: (field: iTextarea) => void
}
export const Textarea: FC<iProps> = ({ onGenerate }): JSX.Element => {
    const defaultValue = {
        fieldType: "textarea",
        value: "",
        formControlName: "",
        fill: "outline",
        placeholder: "",
        label: ""
    } as iTextarea

    const [textArea, setTextArea] = useState(defaultValue)

    useEffect(() => {
        onGenerate(textArea)
    }, [textArea])
    

    const handleFormChange = (field: keyof typeof defaultValue, value: any)  => {
        let current: iTextarea = {...textArea};
        
        current[field] = value as never;
        setTextArea(c => c = current)
        
    }
    
    return (
        <>
            <IonInput label="Form Control Name" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={textArea.formControlName}  fill="outline"
                onIonChange={(val) => handleFormChange('formControlName', val.detail.value)} 
            ></IonInput>
            <IonSelect label="Fill" style={{ marginBottom: "10px" }} fill="outline" value={textArea.fill} onIonChange={(e) => handleFormChange("fill", e.detail.value)}>
                <IonSelectOption value="outline">Outline</IonSelectOption>
                <IonSelectOption value="solid">Solid</IonSelectOption>
            </IonSelect>
            <IonInput label="Placeholder" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={textArea.placeholder} fill="outline"
                onIonChange={(val) => handleFormChange('placeholder', val.detail.value)} 
            ></IonInput>
            <IonInput label="Label" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={textArea.label}  fill="outline"
                onIonChange={(val) => handleFormChange('label', val.detail.value)} 
            ></IonInput>
        </>
    )
};
export default Textarea;