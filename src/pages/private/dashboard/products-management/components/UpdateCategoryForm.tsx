import { IonButton, IonInput, IonSelect, IonSelectOption, useIonAlert, useIonLoading } from "@ionic/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { getAllProductCategoriesFromAPI, iProductCategory, saveNewCategoryToAPI, saveUpdatedProductCategoryToAPI } from "../../../../../requests/product-category.request";
import { useQuery } from "@tanstack/react-query";

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

    

    const allProductCategoriesQuery = useQuery(["all-product-categories"], () => getAllProductCategoriesFromAPI())

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

   

    const saveUpdatedProductCategory = async () => {
        await present();
        try {
            if (categoryName === '') {
                throw new Error("Category name should be empty.")
            }
            const params = {
                productCategoryId: productCategory._id,
                categoryName,
                parent: parent?._id
            }
            console.log(params)
            await saveUpdatedProductCategoryToAPI(params);
            setCategoryName('')
            setParent(null)
            onSuccess();
        } catch (err: any){
            presentAlert(err.message);
        } finally {
            await dismiss();
        }
    }
    return (
        <>
            <IonSelect value={parent} onIonChange={(e) => setParent(e.detail.value)}>
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
            <IonButton expand="block" onClick={saveUpdatedProductCategory}>Save</IonButton>
            <IonButton expand="block" onClick={onDismiss}>Cancel</IonButton>
        </>
    )
};
export default UpdateCategoryForm;