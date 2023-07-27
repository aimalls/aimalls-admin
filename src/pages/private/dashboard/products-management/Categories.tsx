import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { FC } from "react";

export interface iProps {}
export const Categories: FC<iProps> = (props): JSX.Element => {
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
                            
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Categories;