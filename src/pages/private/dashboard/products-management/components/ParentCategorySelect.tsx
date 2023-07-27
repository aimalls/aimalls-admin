import { FC, useRef, useState } from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllParentCategoriesFromAPI, iProductCategory } from "../../../../../requests/product-category.request";
import { useProductCategory } from "../../../../../hooks/useProductCategory";
export interface iProps {
    onSelect?: (productCategory: iProductCategory) => void,
    onNew?: () => void
}
export const ParentCategorySelect: FC<iProps> = ({ onSelect, onNew }): JSX.Element => {
    
    const [presentAlert] = useIonAlert();

    const modal = useRef<HTMLIonModalElement>(null)

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

    const dismiss = () => {
        modal.current?.dismiss()
    }

    return (
        <IonModal trigger="parent-category-select-btn" ref={modal}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => dismiss()} className="ion-text-capitalize">Cancel</IonButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">
                        Title
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton className="ion-text-capitalize">Add</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
                <IonLoading isOpen={loadingComponentRequirementsQuery.isLoading}></IonLoading>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title" onClick={() => onNew && onNew()}>
                                { JSON.stringify(parentCategories) }
                                sdsd
                            </span>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
};
export default ParentCategorySelect;