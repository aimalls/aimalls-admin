import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { FC } from "react";

export interface iProps {}
export const ProductsManagement: FC<iProps> = (props): JSX.Element => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid className="container">
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Products Management</span>
                        </IonCol>
                        <IonCol size="12" sizeMd="4">
                        <IonCard routerLink="products-management/categories">
                            <IonCardHeader>
                                <IonCardTitle>Product Categories</IonCardTitle>
                                {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
                            </IonCardHeader>

                            <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>

                            {/* <IonButton fill="clear">Action 1</IonButton>
                            <IonButton fill="clear">Action 2</IonButton> */}
                        </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default ProductsManagement;