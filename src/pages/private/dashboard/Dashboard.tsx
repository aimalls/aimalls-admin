import { IonBreadcrumb, IonBreadcrumbs, IonCol, IonGrid, IonRow } from "@ionic/react";
import { FC } from "react";

export interface iProps {}
export const Dashboard: FC<iProps> = (props): JSX.Element => {
    return (
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
    )
};
export default Dashboard;