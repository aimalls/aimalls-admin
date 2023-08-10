import { FC, useEffect, useState } from "react";
import { InputCustomEvent, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonPage, IonRow, IonSelect, IonSelectOption, SelectCustomEvent, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { iProductSpecification, getProductSpecificationByID, saveUpdatedProductSpecificationToAPI } from "../../../../requests/product-specification.request";
import { useQuery } from "@tanstack/react-query";
import { options, remove, close } from "ionicons/icons";
import useArray from "../../../../hooks/useArray";
export interface iProps {}
export const UpdateProductSpecification: FC<iProps> = (props): JSX.Element => {

    const params: { id: iProductSpecification['_id'] } = useParams();

    const productSpecificationQuery = useQuery(["product-specification-query"], () => getProductSpecificationByID(params.id))

    const productSpecification: iProductSpecification = productSpecificationQuery.data

    const updateProductSpecificationFormInitialState = {
        _id: "",
        name: "",
        fieldType: "",
        fieldOptions: [] as any
    }

    const [updateProductSpecificationForm, setUpdateProductSpecificationForm] = useState(updateProductSpecificationFormInitialState)

    const handleFormChange = (key: string, value: string | iProductSpecification | any) => {
        console.log("changed", key)
        if (key == "fieldType" && value == "textInput") {
            clear()
        } 
        setUpdateProductSpecificationForm((current) => {
            let curr = {...current};
            curr[key as keyof typeof current] = value
            return curr;
        })
    }

    const { array: options, set, push, remove, filter, update, clear } = useArray([])

    useEffect(() => {
        setUpdateProductSpecificationForm((current) => {
            let curr = {...current};
            curr.fieldOptions = options
            return curr;
        })
    }, [options])

    useEffect(() => {
        
        if (productSpecification) {
            clear()
            handleFormChange("name", productSpecification.name)
            handleFormChange("_id", productSpecification._id!)
            handleFormChange("fieldType", productSpecification.fieldType)
            productSpecification.fieldOptions?.forEach((val) => {
                push(val)
            })
        }
    }, [productSpecification])

    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const handleOptionChange = (index: number, value: any) => {
        update(index, value)
    }

    const hanldeAddOption = () => {
        push("")
    }


    const saveUpdatedProductSpecification = async () => {
        try {
            await present();
            const result = await saveUpdatedProductSpecificationToAPI(updateProductSpecificationForm)
            navigation.push("/dashboard/products-management/specifications")
            await presentToast(result.message, 3000)
        } catch (err: any) {
            await presentToast(err, 3000)
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
                            <span className="page-title">Update Product Specification</span>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" className="form">
                            { productSpecification ? (
                                <>
                                    <IonInput
                                label="Specification Name"
                                placeholder="Please Input"
                                labelPlacement="floating"
                                fill="outline"
                                value={updateProductSpecificationForm.name}
                                onIonInput={(e) => handleFormChange("name", e.detail.value)}
                            />
                            <IonSelect
                                label="Field Type"
                                fill="outline"
                                labelPlacement="floating"
                                placeholder="Please Select"
                                value={updateProductSpecificationForm.fieldType}
                                onIonChange={(e) => handleFormChange("fieldType", e.detail.value)}
                            >
                                <IonSelectOption value="select">Select</IonSelectOption>
                                <IonSelectOption value="textInput">Text Input</IonSelectOption>
                                <IonSelectOption value="unitInput">Unit Input</IonSelectOption>
                            </IonSelect>
                            
                            { ["select", "unitInput"].includes(updateProductSpecificationForm.fieldType) ? (
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
                                </>
                            ): "Product Specification Not Found!" }
                        </IonCol>
                    </IonRow>
                    
                    <IonRow className="ion-justify-content-end">
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" routerLink="/dashboard/products-management/specifications" color={"secondary"}>Cancel</IonButton>
                        </IonCol>
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" onClick={saveUpdatedProductSpecification}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default UpdateProductSpecification;