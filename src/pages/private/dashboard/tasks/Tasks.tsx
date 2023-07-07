import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { FC } from "react";
import CustomerFormGenerator from "../../../../components/CustomerFormGenerator";

export interface iProps {}
export const Tasks: FC<iProps> = (props): JSX.Element => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonButton routerLink="/dashboard/tasks/new">New</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
};
export default Tasks;