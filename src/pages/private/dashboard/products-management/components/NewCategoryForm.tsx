import { IonButton, IonInput, useIonAlert, useIonLoading } from "@ionic/react";
import { FC, useState } from "react";
import { saveNewCategoryToAPI } from "../../../../../requests/product-category.request";

export interface iProps {
    onSuccess: () => void,
}
export const NewCategoryForm: FC<iProps> = ({ onSuccess }): JSX.Element => {

    const [categoryName, setCategoryName] = useState('');

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const saveNewCategory = async () => {
        await present();
        try {
            if (categoryName === '') {
                throw new Error("Category name should be empty.")
            }
            const params = {
                categoryName
            }
            await saveNewCategoryToAPI(params);
            onSuccess();
        } catch (err: any){
            presentAlert(err.message);
        } finally {
            await dismiss();
        }
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
            <IonButton expand="block" onClick={saveNewCategory}>Save</IonButton>
        </>
    )
};
export default NewCategoryForm;