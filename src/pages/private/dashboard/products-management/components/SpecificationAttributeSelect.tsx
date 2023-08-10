import { FC, useEffect, useState } from "react";
import { CheckboxCustomEvent, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router";
import { iProductSpecification } from "../../../../../requests/product-specification.request";
import { refresh } from "ionicons/icons";
import useArray from "../../../../../hooks/useArray";
export interface iProps {
    isOpen: boolean,
    productSpecificationID: iProductSpecification['_id'],
    onDismiss: () => void,
    onAddAttribute: (productSpecificationID: iProductSpecification['_id'], attributes: string[]) => void,
    selectedAttributes: string[]
}
export const SpecificationAttributeSelect: FC<iProps> = ({ isOpen, productSpecificationID, onDismiss, onAddAttribute, selectedAttributes }): JSX.Element => {
    

    const {array: attributes, push, remove, clear } = useArray([]);

    useEffect(() => {
        if (selectedAttributes.length !== 0) {
            selectedAttributes.forEach(val => {
                push(val)
            })
        } else {
            clear();
        }
    }, [selectedAttributes])

    const attributesSelection = [
        "Required", "Self-Fill"
    ]

    const isChecked = (value: string) => {
        return attributes.indexOf(value) > -1;
    };

    const handleProductSpecificationAttributeChange = (ev: CheckboxCustomEvent) => {
        const { checked, value } = ev.detail;

        if (checked) {
            push(value);
        } else {
            remove(attributes.indexOf(value));
        }
        
    }

    const handleAddAttribute = () => {
        const uniqueAttributes = [...new Set(attributes)]
        onAddAttribute(productSpecificationID, uniqueAttributes)
    }

    return (
        <IonModal isOpen={ isOpen }>
            <IonHeader style={{ boxShadow: 'none' }}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => onDismiss()}>Close</IonButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center"></IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => handleAddAttribute()}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonList>
                    { attributesSelection.map((val, index) => (
                        <IonItem key={`attribute-selection-${index}`}>
                            <IonCheckbox value={val} checked={isChecked(val)} onIonChange={handleProductSpecificationAttributeChange}>{val}</IonCheckbox>
                        </IonItem>
                    )) }
                </IonList>
            </IonContent>
        </IonModal>
    )
};
export default SpecificationAttributeSelect;