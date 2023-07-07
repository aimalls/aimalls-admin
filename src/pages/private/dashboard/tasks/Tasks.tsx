import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { FC } from "react";
import useTask from "../../../../hooks/useTask";



export interface iProps {}
export const Tasks: FC<iProps> = (props): JSX.Element => {

    const { tasks, isTasksLoading } = useTask()

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <IonButton routerLink="/dashboard/tasks/new">New</IonButton>
                </IonCol>
                <IonCol size="12">
                    { JSON.stringify(tasks) }
                </IonCol>
            </IonRow>
        </IonGrid>
    )
};
export default Tasks;