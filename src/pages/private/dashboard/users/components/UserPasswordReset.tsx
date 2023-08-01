import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
export interface iProps {}
export const UserPasswordReset: FC<iProps> = (props): JSX.Element => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">{"UserPasswordReset"}</span>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default UserPasswordReset;