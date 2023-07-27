import { FC, useRef, useState } from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonLoading, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllParentCategoriesFromAPI, iProductCategory } from "../../../../../requests/product-category.request";
import { useProductCategory } from "../../../../../hooks/useProductCategory";
import NewCategoryForm from "./NewCategoryForm";
export interface iProps {
    onSelect?: (productCategory: iProductCategory) => void,
    onNew?: () => void
}
export const ParentCategorySelect: FC<iProps> = ({ onSelect, onNew }): JSX.Element => {
    
    const [presentAlert] = useIonAlert();

    const modal = useRef<HTMLIonModalElement>(null)
    const [isNewCategory, setIsNewCategory] = useState<boolean>(false);

    const [parentCategories, setParentCategories] = useState<iProductCategory[]>([])



    const loadingComponentRequirementsQuery = useQuery(
        ["load-page-requirements"], () => loadComponentRequirements()
    );

    const loadComponentRequirements = async () => {
        try {
            const result = await getAllParentCategoriesFromAPI()
            setParentCategories(result)
            return true
        } catch (err: any) {
            presentAlert(err.message)
        }
        return false
    }

    const handleNewCategoryFormSuccess = () => {
        loadComponentRequirements()
        setIsNewCategory(false)
    }

    

    const dismiss = () => {
        modal.current?.dismiss()
    }

    return (
        <IonModal trigger="parent-category-select-btn" ref={modal}>
            <IonHeader style={{ boxShadow: 'none' }}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => dismiss()} className="ion-text-capitalize">Cancel</IonButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">
                        Title
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton className="ion-text-capitalize" onClick={() => setIsNewCategory(true)}>New</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen={loadingComponentRequirementsQuery.isLoading}></IonLoading>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            { isNewCategory ? (
                                <NewCategoryForm onFormDismiss={() => setIsNewCategory(false)} onSuccess={() => handleNewCategoryFormSuccess()} />
                            ): (
                                <IonCol size="12">
                                    <IonList>
                                        { parentCategories.map((parentCategory, index) => (
                                            <IonItem key={index}>
                                                { parentCategory.name }
                                            </IonItem>
                                        )) }
                                    </IonList>
                                </IonCol>
                            ) }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
};
export default ParentCategorySelect;