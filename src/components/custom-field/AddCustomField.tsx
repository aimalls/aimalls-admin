import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonModal, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { Dispatch, FC, useRef, useState } from "react";
import TextInput from "./inputs/TextInput";
import Textarea from "./inputs/Textarea";
import SelectInput from "./inputs/SelectInput";
import FileInput from "./inputs/FileInput";

export type tFieldType = "text" | "textarea" | "select" | "file" | undefined

export type tTextInput =
| 'date'
| 'email'
| 'number'
| 'password'
| 'search'
| 'tel'
| 'text'
| 'url'
| 'time'
| 'week'
| 'month'
| 'datetime-local';


export interface iDefaultInput {
    value: string;
    fill: "outline" | "solid";
    placeholder: string;
    labelPlacement: 'start' | 'end' | 'floating' | 'stacked' | 'fixed';
    label: string;
    formControlName: string,
}

export interface iTextInput extends iDefaultInput {
    fieldType: "text"
    type: tTextInput | undefined;
}

export interface iSelectOption {
    value: string,
    label: string
}

export interface iSelectInput extends iDefaultInput{
    fieldType: "select"
    type: "select",
    multiple: boolean,
    options: iSelectOption[]
}

export interface iTextarea extends iDefaultInput {
    fieldType: "textarea"
    type: "textarea"
    autoGrow: boolean;
}

export interface iFileInput {
    fieldType: "file"
    type: "file",
    multiple: boolean,
    value: string,
    label: string,
    placeholder: string
    formControlName: string
}

export type tCustomField = iTextInput | iSelectInput | iTextarea | iFileInput | undefined;


export interface iProps {
    onAdd?: (field: tCustomField) => void
}
export const AddCustomField: FC<iProps> = ({ onAdd }): JSX.Element => {
    const modal = useRef<HTMLIonModalElement>(null);

    const [fieldType, setFieldType] = useState<tFieldType>()

    const [generatedField, setGeneratedField] = useState<tCustomField>()

    const fieldTypeOptions = [
        { value: "text",  label: "Text" },
        { value: "textarea", label: "Textarea" },
        { value: "select", label: "Select" },
        { value: "file", label: "File" },
    ]

    const generate = (field: tCustomField) => {
       
        setGeneratedField(field)
    }

    const handleAddField = () => {
        if (onAdd) {
            onAdd(generatedField)
            dismiss()
        }
    }

    const dismiss = () => {
        modal.current?.dismiss();
    }

    return (
        <IonModal id="add-custom-action-model" ref={modal} trigger="open-custom-dialog">
            <IonContent>
                <IonGrid>
                    <IonRow className="ion-padding">
                        <IonCol size="12" className="ion-padding-vertical">Add Custom Action</IonCol>
                        <IonCol size="12">
                            <IonSelect fill="outline" value={fieldType} label="Field Type" labelPlacement="floating" onIonChange={(e) => setFieldType(e.target.value)}>
                                { fieldTypeOptions.map((option, index) => (
                                    <IonSelectOption key={index} value={option.value}>{option.label}</IonSelectOption>
                                )) }
                            </IonSelect>
                        </IonCol>
                        { fieldType == 'text' ? (
                            <IonCol size="12">
                                <TextInput onGenerate={generate} />
                            </IonCol>
                        ): fieldType == 'textarea' ? (
                            <IonCol size="12">
                                <Textarea onGenerate={generate} />
                            </IonCol>
                        ): fieldType == 'select' ? (
                            <IonCol size="12">
                                <SelectInput onGenerate={generate} />
                            </IonCol>
                        ): fieldType == 'file' ? (
                            <IonCol size="12">
                                <FileInput onGenerate={generate} />
                            </IonCol>
                        ): null }
                    </IonRow>
                </IonGrid>
            </IonContent>
            <div className="ion-padding" style={{ display: 'flex', justifyContent: 'end' }}>
            <IonButton onClick={dismiss} fill="clear">Close</IonButton>
            <IonButton onClick={() => handleAddField()} fill="clear">Add</IonButton>
            </div>
        </IonModal>
    )
};
export default AddCustomField;