import { IonButton, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSelect, IonSelectOption, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { getAllProductCategoriesFromAPI, iProductCategory, saveNewCategoryToAPI, saveUpdatedProductCategoryToAPI } from "../../../../../requests/product-category.request";
import { useQuery } from "@tanstack/react-query";
import SpecificationAttributeSelect from "./SpecificationAttributeSelect";
import { useProductSpecification } from "../../../../../hooks/useProductSpecification";
import { iProductSpecification } from "../../../../../requests/product-specification.request";

export interface iProps {
    productCategory: iProductCategory
    onSuccess: () => void,
    onDismiss: () => void
}
export const UpdateCategoryForm: FC<iProps> = ({ onSuccess, productCategory, onDismiss }): JSX.Element => {

    const [categoryName, setCategoryName] = useState<iProductCategory['name']>('');
    const [parent, setParent] = useState<iProductCategory | null>(null);


    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    

    
    const { productSpecificationsQuery, productSpecifications } = useProductSpecification();
    const allProductCategoriesQuery = useQuery(["all-product-categories"], () => getAllProductCategoriesFromAPI())

    const [selectedProductSpecifications, setSelectedProductSpecifications] = useState<iProductSpecification[]>([]);
    const [specificationAttributeSelectDialog, setSpecificationAttributeSelectDialog]  = useState<boolean>(false)
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

    const allProductCategories: iProductCategory[] = useMemo(() => {
        
        if (allProductCategoriesQuery.data && allProductCategoriesQuery.data.length !== 0) {
            return allProductCategoriesQuery.data.filter((v: iProductCategory) => {
                return v._id !== productCategory._id
            })
        }
        return []
    }, [allProductCategoriesQuery.data]);

    useEffect(() => {
        if (allProductCategories && allProductCategories.length !== 0 && productCategory) {
            setCategoryName(productCategory.name)
            setParent((c) => {
                const parentFound = allProductCategories.find(v => v._id == productCategory.parent) as iProductCategory
                if (!parentFound) {
                    return null
                } else {
                    return parentFound
                }
            })

        }
    }, [allProductCategories, productCategory])

    useEffect(() => {
        if (productSpecifications) {
            const mappedSpecifications = productSpecifications.filter(val => {
                if (productCategory.specifications) {
                    if (productCategory.specifications.find(at => at.specificationId === val._id)) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
            

            const mappedSpecifications2 = mappedSpecifications.map(specification => {
                const sp = productCategory.specifications?.find(s => s.specificationId == specification._id)
                if (sp) {
                    specification.attributes = sp.attributes
                    return specification
                } else {
                    return specification
                }
            })
            handleSelectedProductSpecificationChange(mappedSpecifications2)
            
        }
    }, [productSpecifications])



   

    const saveUpdatedProductCategory = async () => {
        await present();
        try {
            if (categoryName === '') {
                throw new Error("Category name should be empty.")
            }
            const mappedProductSpecification = selectedProductSpecifications.map((specification) => {
                if (specification.attributes) {
                    return {specificationId: specification._id, attributes: specification.attributes }
                }
                return {specificationId: specification._id }
            })

            const params = {
                productCategoryId: productCategory._id,
                categoryName,
                productSpecifications: mappedProductSpecification,
                parent: parent?._id
            }

            const result = await saveUpdatedProductCategoryToAPI(params);
            setCategoryName('')
            setParent(null)
            presentToast(result.message, 3000)
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
            <IonSelect fill="outline" label="Parent Category" labelPlacement="floating" value={parent} onIonChange={(e) => setParent(e.detail.value)}>
                <IonSelectOption value={null}>
                    Parent Category
                </IonSelectOption>
                { allProductCategories ? allProductCategories.map((productCategory, index) => (
                    <IonSelectOption value={productCategory} key={`product-category-option-${index}`}>
                        { productCategory.name }
                    </IonSelectOption>
                )) : null }
            </IonSelect>
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
                <>
                <IonSelect
                    multiple
                    label="Select Specification"
                    labelPlacement="floating"
                    fill="outline"
                    value={selectedProductSpecifications}
                    onIonChange={(e) => handleSelectedProductSpecificationChange(e.detail.value)}
                >
                    { productSpecifications ? productSpecifications.map((productSpecification, index) => (
                        <IonSelectOption  key={`product-specification-${index}`} value={productSpecification}>
                            { productSpecification.name }
                        </IonSelectOption>
                    )): null }
                </IonSelect>
                </>
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
            <IonButton expand="block" onClick={saveUpdatedProductCategory}>Save</IonButton>
            <IonButton expand="block" onClick={onDismiss}>Cancel</IonButton>
        </>
    )
};
export default UpdateCategoryForm;