import { FC, useEffect, useState } from "react";
import { InputCustomEvent, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonPage, IonRow, IonSelect, IonSelectOption, SelectCustomEvent, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import useArray from "../../../../hooks/useArray";
import { close } from "ionicons/icons";
import { saveNewProductSpecificationToAPI } from "../../../../requests/product-specification.request";
export interface iProps {}
export const NewProductSpecification: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presetToast] = useIonToast();
    // name: String,
    // label: String,
    // filedType: String,
    // fieldOptions: [String],


    const newProductSpecificationFormInitialState = {
        name: "",
        fieldType: "",
        fieldOptions: [] as any
    }

    const [newProductSpecificationForm, setNewProductSpecificationForm] = useState(newProductSpecificationFormInitialState)


    const { array: options, set, push, remove, filter, update, clear } = useArray([])

    const handleFormChange = (key: string, e: SelectCustomEvent | InputCustomEvent) => {
        setNewProductSpecificationForm((current) => {
            let curr = {...current};
            curr[key as keyof typeof current] = e.detail.value
            return curr;
        })
    }

    useEffect(() => {
        setNewProductSpecificationForm((current) => {
            let curr = {...current};
            curr.fieldOptions = options
            return curr;
        })
    }, [options])

    const handleOptionChange = (index: number, value: any) => {
        update(index, value)
    }

    const hanldeAddOption = () => {
        push("")
    }

    const saveNewProductSpecification = async () => {
        try {
            await present();
            const result = await saveNewProductSpecificationToAPI(newProductSpecificationForm)
            setNewProductSpecificationForm(newProductSpecificationFormInitialState)
            await presetToast(result.message, 3000)
        } catch (err: any) {
            await presetToast(err, 3000)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">New Product Specification</span>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" className="form">
                            <IonInput
                                label="Specification Name"
                                placeholder="Please Input"
                                labelPlacement="floating"
                                fill="outline"
                                value={newProductSpecificationForm.name}
                                onIonInput={(e) => handleFormChange("name", e)}
                            />
                            <IonSelect
                                label="Field Type"
                                fill="outline"
                                labelPlacement="floating"
                                placeholder="Please Select"
                                value={newProductSpecificationForm.fieldType}
                                onIonChange={(e) => handleFormChange("fieldType", e)}
                            >
                                <IonSelectOption value="select">Select</IonSelectOption>
                                <IonSelectOption value="textInput">Text Input</IonSelectOption>
                                <IonSelectOption value="unitInput">Unit Input</IonSelectOption>
                            </IonSelect>
                            
                            { ["select", "unitInput"].includes(newProductSpecificationForm.fieldType) ? (
                                <>
                                    <IonButton expand="block" onClick={hanldeAddOption}>Add Options</IonButton>
                                    { options.map((option, index) => (
                                        <div
                                            key={`option-${index}`}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            
                                        <IonButton color={"danger"} fill="clear" onClick={() => remove(index)}>
                                            <IonIcon icon={ close }></IonIcon>
                                        </IonButton>
                                        <IonInput
                                            label={`Option ${index + 1}`}
                                            placeholder="Please Input"
                                            labelPlacement="floating"
                                            fill="outline"
                                            value={option}
                                            onIonInput={(e) => handleOptionChange(index, e.detail.value)}
                                        />
                                        </div>
                                    )) }
                                </>
                            ) : null }

                            
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-end">
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" routerLink="/dashboard/products-management/specifications" color={"secondary"}>Cancel</IonButton>
                        </IonCol>
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" onClick={saveNewProductSpecification}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default NewProductSpecification;