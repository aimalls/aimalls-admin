import { IonBreadcrumb, IonBreadcrumbs, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { FC } from "react";
import PageHeader from "../../../layouts/dashboard/PageHeader";

export interface iProps {}
export const Dashboard: FC<iProps> = (props): JSX.Element => {
    return (
        <IonPage>
            <div className="ion-hide-md-up">
                <PageHeader/>
            </div>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            Dashboard
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Dashboard;