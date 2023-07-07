import { FC, useEffect, useState } from "react";
import { iFileInput } from "../AddCustomField";
import { IonInput, IonSelect, IonSelectOption } from "@ionic/react";

export interface iProps {
    onGenerate: (field: iFileInput) => void
}
export const FileInput: FC<iProps> = ({ onGenerate }): JSX.Element => {
    const defaultValue = {
        fieldType: "file",
        value: "",
        label: "",
        multiple: false,
        type: "file"
    } as iFileInput

    const [fileInput, setFileInput] = useState(defaultValue)

    useEffect(() => {
        onGenerate(fileInput)
    }, [fileInput])
    

    const handleFormChange = (field: keyof typeof defaultValue, value: any)  => {
        let current: iFileInput = {...fileInput};
        
        current[field] = value as never;
        setFileInput(c => c = current)
        
    }
    return (
        <>
            <IonInput label="Form Control Name" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={fileInput.formControlName}  fill="outline"
                onIonChange={(val) => handleFormChange('formControlName', val.detail.value)} 
            ></IonInput>
            <IonSelect label="Multiple" style={{ marginBottom: "10px" }} fill="outline" value={fileInput.multiple} onIonChange={(e) => handleFormChange("multiple", e.detail.value)}>
                <IonSelectOption value={true}>Yes</IonSelectOption>
                <IonSelectOption value={false}>No</IonSelectOption>
            </IonSelect>
            <IonInput label="Placeholder" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={fileInput.placeholder} fill="outline"
                onIonChange={(val) => handleFormChange('placeholder', val.detail.value)} 
            ></IonInput>
            <IonInput label="Label" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={fileInput.label}  fill="outline"
                onIonChange={(val) => handleFormChange('label', val.detail.value)} 
            ></IonInput>
        </>
    )
};
export default FileInput;