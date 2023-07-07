import { FC, useEffect, useState } from "react";
import { iSelectInput } from "../AddCustomField";
import { IonButton, IonCol, IonInput, IonRow, IonSelect, IonSelectOption } from "@ionic/react";

export interface iProps {
    onGenerate: (field: iSelectInput) => void
}
export const SelectInput: FC<iProps> = ({ onGenerate }): JSX.Element => {
    const defaultValue = {
        fieldType: "select",
        value: "",
        formControlName: "",
        fill: "outline",
        placeholder: "",
        multiple: false,
        label: "",
        options: [{}]
    } as iSelectInput

    const [selectInput, setSelectInput] = useState(defaultValue)

    const [selectOptions, setSelectOptions] = useState(defaultValue.options)

    const [optionForm, setOptionForm] = useState({ value: "", label: "" })

    useEffect(() => {
        onGenerate(selectInput)
    }, [selectInput])

    useEffect(() => {
        handleFormChange("options", selectOptions)
    }, [selectOptions])
    

    const handleFormChange = (field: keyof typeof defaultValue, value: any)  => {
        let current: iSelectInput = {...selectInput};
        
        current[field] = value as never;
        setSelectInput(c => c = current)
        
    }


    const handleOptionsAdd = () => {
        const current = selectOptions.filter(val => {
            return Object.keys(val).length !== 0
        });
        setSelectOptions([...current, optionForm])
        setOptionForm({ value: "", label: "" })
    }

    const handleSetOptionValue = (value: string) => {
        let current = optionForm;
        current.value = value
        setOptionForm(current)
    }
    const handleSetOptionLabel = (label: string) => {
        let current = optionForm;
        current.label = label
        setOptionForm(current)
    }

    return (
        <>
            <IonInput label="Form Control Name" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={selectInput.formControlName}  fill="outline"
                onIonChange={(val) => handleFormChange('formControlName', val.detail.value)} 
            ></IonInput>
            <IonSelect label="Fill" style={{ marginBottom: "10px" }} fill="outline" value={selectInput.fill} onIonChange={(e) => handleFormChange("fill", e.detail.value)}>
                <IonSelectOption value="outline">Outline</IonSelectOption>
                <IonSelectOption value="solid">Solid</IonSelectOption>
            </IonSelect>
            <IonSelect label="Multiple" style={{ marginBottom: "10px" }} fill="outline" value={selectInput.multiple} onIonChange={(e) => handleFormChange("multiple", e.detail.value)}>
                <IonSelectOption value={true}>Yes</IonSelectOption>
                <IonSelectOption value={false}>No</IonSelectOption>
            </IonSelect>
            <IonInput label="Placeholder" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={selectInput.placeholder} fill="outline"
                onIonChange={(val) => handleFormChange('placeholder', val.detail.value)} 
            ></IonInput>
            <IonInput label="Label" labelPlacement="floating" type="text" style={{ marginBottom: "10px" }} value={selectInput.label}  fill="outline"
                onIonChange={(val) => handleFormChange('label', val.detail.value)} 
            ></IonInput>
            <IonRow>
                <IonCol size="12">Options</IonCol>
                <IonCol size="12" sizeMd="5">
                    <IonInput value={optionForm.value} fill="outline" label="Value" labelPlacement="floating" onIonChange={(val) => handleSetOptionValue(val.detail.value!)}></IonInput>
                </IonCol>
                <IonCol size="12" sizeMd="5">
                    <IonInput value={optionForm.label} fill="outline" label="Label" labelPlacement="floating" onIonChange={(val) => handleSetOptionLabel(val.detail.value!)}></IonInput>
                </IonCol>
                <IonCol size="12" sizeMd="2" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <IonButton expand="block" onClick={() => handleOptionsAdd()}>Add</IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
                { selectOptions.map((option, index) => (
                    <IonCol key={`option-${index}`} size="12">
                        <IonRow>
                            <IonCol size="6" key={`option-label-${index}`}>{ option.label }</IonCol>
                            <IonCol size="6" key={`option-value-${index}`}>{ option.value }</IonCol>
                        </IonRow>
                    </IonCol>
                ))
                }
            </IonRow>
        </>
    )
};
export default SelectInput;