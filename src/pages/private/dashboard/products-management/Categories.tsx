import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow, useIonAlert } from "@ionic/react";
import { FC, useState } from "react";
import { getAllParentCategoriesFromAPI, iProductCategory } from "../../../../requests/product-category.request";
import { useQuery } from "@tanstack/react-query";

export interface iProps {}
export const Categories: FC<iProps> = (props): JSX.Element => {

    const [parentCategories, setParentCategories] = useState<iProductCategory[]>([])


    const [presentAlert] = useIonAlert();

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
    
    return (
        <IonPage>
            <IonContent>
                <IonGrid className="container">
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Product Categories</span>
                            <IonButton routerLink="/dashboard/products-management/categories/new">New</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonList lines="full">
                                { parentCategories.map((parentCategory, index) => (
                                    <div key={index}>
                                        <IonItemSliding>
                                            <IonItem  button>
                                                <IonLabel>
                                                    { parentCategory.name }
                                                </IonLabel>
                                            </IonItem>
                                            <IonItemOptions side="end">
                                                <IonItemOption color={"danger"}>Delete</IonItemOption>
                                                <IonItemOption color={"primary"}>Update</IonItemOption>
                                            </IonItemOptions>
                                        
                                        </IonItemSliding>
                                    </div>
                                )) }
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Categories;