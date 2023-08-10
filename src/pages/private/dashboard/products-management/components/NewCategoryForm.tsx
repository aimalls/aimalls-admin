import { CheckboxCustomEvent, IonButton, IonCheckbox, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSelect, IonSelectOption, useIonAlert, useIonLoading } from "@ionic/react";
import { FC, useState } from "react";
import { iProductCategory, saveNewCategoryToAPI } from "../../../../../requests/product-category.request";
import { useProductSpecification } from "../../../../../hooks/useProductSpecification";
import { iProductSpecification } from "../../../../../requests/product-specification.request";
import SpecificationAttributeSelect from "./SpecificationAttributeSelect";

export interface iProps {
    parent?: iProductCategory['_id']
    onSuccess: () => void,
}
export const NewCategoryForm: FC<iProps> = ({ onSuccess, parent }): JSX.Element => {

    const [categoryName, setCategoryName] = useState('');

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const { productSpecificationsQuery, productSpecifications } = useProductSpecification();

    const [selectedProductSpecifications, setSelectedProductSpecifications] = useState<iProductSpecification[]>([]);
    const [specificationAttributeSelectDialog, setSpecificationAttributeSelectDialog]  = useState<boolean>(false)
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

    const saveNewCategory = async () => {
        await present();
        try {
            if (categoryName === '') {
                throw new Error("Category name should not be empty.")
            }

            const mappedProductSpecification = selectedProductSpecifications.map((specification) => {
                if (specification.attributes) {
                    return {specificationId: specification._id, attributes: specification.attributes }
                }
                return {specificationId: specification._id }
            })

            const params = {
                categoryName,
                parent,
                productSpecifications: mappedProductSpecification
            }

            await saveNewCategoryToAPI(params);
            setCategoryName('')
            onSuccess();
        } catch (err: any){
            presentAlert(err.message);
        } finally {
            await dismiss();
        }
    }

    const handleSelectedProductSpecificationChange = (value: iProductSpecification[]) => {
        
        setSelectedProductSpecifications(value);
    }


    const [addAttributeTo, setAddAttributeTo] = useState<iProductSpecification['_id']>("")
    const handleSpecificationAttributeSelectDialog = (productSpecificationID: iProductSpecification['_id']) => {
        setSpecificationAttributeSelectDialog(!specificationAttributeSelectDialog)
        if (specificationAttributeSelectDialog) {
            setAddAttributeTo("")
            setSelectedAttributes([])
        } else {
            setAddAttributeTo(productSpecificationID)
            const prodSpecification = selectedProductSpecifications.find(val => val._id == productSpecificationID)
            if (prodSpecification?.attributes && prodSpecification?.attributes.length !== 0) {
                setSelectedAttributes(prodSpecification.attributes)
            } else {
                setSelectedAttributes([])
            }
        }
    }

    const handleOnAddAttribute = (productSpecificationID: iProductSpecification['_id'], attributes: string[]) => {
        setAddAttributeTo("")
        setSpecificationAttributeSelectDialog(!specificationAttributeSelectDialog)
        setSelectedProductSpecifications(current => {
            return current.map((curr) => {
                if (curr._id == productSpecificationID) {
                    return {...curr, attributes}
                } else {
                    return curr
                }
            })
        })
    }

    return (
        <>
            <IonInput
                type="text"
                fill="outline"
                label="Category Name"
                labelPlacement="floating"
                placeholder="Input Category Name"
                style={{ marginBottom: '10px' }}
                value={categoryName}
                onIonInput={(e) => setCategoryName(e.detail.value!)}
            />
            { !productSpecificationsQuery.isLoading ? (
                <IonSelect
                    multiple
                    label="Select Specification"
                    labelPlacement="floating"
                    fill="outline"
                    value={selectedProductSpecifications}
                    onIonChange={(e) => handleSelectedProductSpecificationChange(e.detail.value)}
                >
                    { productSpecifications ? productSpecifications.map((productSpecification, index) => (
                        <IonSelectOption key={`product-specification-${index}`} value={productSpecification}>
                            { productSpecification.name }
                        </IonSelectOption>
                    )): null }
                </IonSelect>
                
            ): "Loading Product Specifications" }
            <IonList>
                { selectedProductSpecifications ? selectedProductSpecifications.map((selectedProductSpecification, index) => (
                    <IonItemSliding key={`selected-product-specification-${index}`}>
                        <IonItem button>
                            <IonLabel>
                                { selectedProductSpecification.name }
                            </IonLabel>
                            { `${selectedProductSpecification.attributes ? selectedProductSpecification.attributes : ''} ` }
                        </IonItem>
                        <IonItemOptions slot="end">
                            <IonItemOption color={"primary"} onClick={() => handleSpecificationAttributeSelectDialog(selectedProductSpecification._id)}>Add Attribute</IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                )): null }
            </IonList>
            <SpecificationAttributeSelect 
                isOpen={specificationAttributeSelectDialog} 
                productSpecificationID={addAttributeTo} 
                onDismiss={() => handleSpecificationAttributeSelectDialog("")}
                onAddAttribute={handleOnAddAttribute}
                selectedAttributes={selectedAttributes}
            />
            <IonButton expand="block" onClick={saveNewCategory}>Save</IonButton>
        </>
    )
};
export default NewCategoryForm;