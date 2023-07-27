import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonLoading, IonModal, IonPage, IonRow, useIonAlert } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllParentCategoriesFromAPI } from "../../../../../requests/product-category.request";
export interface iProps {
    onSelect?: () => string,
    onNew?: () => boolean
}
export const ParentCategorySelect: FC<iProps> = (props): JSX.Element => {
    
    const [presentAlert] = useIonAlert();

    const loadingComponentRequirementsQuery = useQuery(
        ["load-page-requirements"], () => loadComponentRequirements()
    );

    const loadComponentRequirements = async () => {
        try {
            await getAllParentCategoriesFromAPI()
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
                            <span className="page-title">wtf</span>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                
            </IonContent>
        </IonModal>
    )
};
export default ParentCategorySelect;