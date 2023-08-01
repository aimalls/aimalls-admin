import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
export interface iProps {}
export const Roles: FC<iProps> = (props): JSX.Element => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">{"Roles"}</span>
                            <IonButton routerLink="/dashboard/roles/new">Add New Role</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Roles;