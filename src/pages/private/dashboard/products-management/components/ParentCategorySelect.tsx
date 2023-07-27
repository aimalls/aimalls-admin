import { FC, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonLoading, IonModal, IonPage, IonRow, useIonAlert } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllParentCategoriesFromAPI, iProductCategory } from "../../../../../requests/product-category.request";
export interface iProps {
    onSelect?: (productCategory: iProductCategory) => void,
    onNew?: () => void
}
export const ParentCategorySelect: FC<iProps> = ({ onSelect, onNew }): JSX.Element => {
    
    const [presentAlert] = useIonAlert();

    const [parentCategories, setParentCategories] = useState<iProductCategory[]>([])

    const loadingComponentRequirementsQuery = useQuery(
        ["load-page-requirements"], () => loadComponentRequirements()
    );

    const loadComponentRequirements = async () => {
        try {
            const result = await getAllParentCategoriesFromAPI()
            setParentCategories(result.data)
            return true
        } catch (err: any) {
            presentAlert(err.message)
        }
        return false
    }

    return (
        <IonModal trigger="parent-category-select-btn">
            <IonContent>
                
                <IonLoading isOpen={loadingComponentRequirementsQuery.isLoading}></IonLoading>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title" onClick={() => onNew && onNew()}>wtf</span>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                
            </IonContent>
        </IonModal>
    )
};
export default ParentCategorySelect;