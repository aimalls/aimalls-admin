import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { approveParticipantTaskToAPI, denyParticipantTaskToAPI, getAllCheckedParticipantsTaskFromAPI } from "../../../../../requests/user-task.request";
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonItem, IonList, IonRow, useIonAlert, useIonLoading } from "@ionic/react";
import { CustomField, iUserTask } from "../../../../../types/userTask";
import { tCustomField } from "../../../../../components/custom-field/AddCustomField";

export interface iProps {
    taskId: string,
}
export const CheckParticipantsTask: FC<iProps> = ({taskId}): JSX.Element => {

    const taskParticipantsQuery = useQuery(
        ["taskParticipants"],
        () => getAllCheckedParticipantsTaskFromAPI(taskId)
    )

    const taskParticipants: iUserTask[] = taskParticipantsQuery.data;
    const isTaskParticipantsLoading = taskParticipantsQuery.isLoading;

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const denyParticipantTask = async (id: string) => {
        
        try {
            await presentAlert("Are you sure you want to deny this task?", [
                { 
                    text: "Cancel", handler: () => {} },
                {
                    text: "Yes", handler: async () => {
                        await present();
                        await denyParticipantTaskToAPI(id) 
                        await dismiss();
                        taskParticipantsQuery.refetch()
                    }
                }
            ])
        } catch (error: any) {
            presentAlert(error.message)
        }
    }

    const approveParticipantTask = async (id: string) => {
        try {
            await presentAlert("Are you sure you want to approve this task?", [
                { 
                    text: "Cancel", handler: () => {} },
                {
                    text: "Yes", handler: async () => {
                        await present();
                        await approveParticipantTaskToAPI(id) 
                        await dismiss();
                        taskParticipantsQuery.refetch()
                    }
                }
            ])
        } catch (error: any) {
            presentAlert(error.message)
        }
    }


    return (
        <>
        { isTaskParticipantsLoading ? 
            <div>
                Loading Participants...
            </div>
        : 
            <div>
                { taskParticipants.length !== 0 ? 
                <>
                    { taskParticipants.map((participant) => (
                    <IonCard key={participant._id}>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" sizeMd="4">
                                        <div>Email: { participant.userId.email }</div>
                                        <div>Date: { participant.createdAt }</div>
                                    </IonCol>
                                    <IonCol size="12" sizeMd="5">
                                        
                                        { participant.taskId.customFields.length !== 0 ? 
                                            <div>
                                            {
                                                participant.taskId.customFields.map((field: CustomField, index: number) => (
                                                    <div key={`custom-field-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div>{ field.label }:</div>
                                                        <div>
                                                            { field?.fieldType == 'file' ? 
                                                                <a href={participant.userInputs[field.formControlName]} target="_blank">Click Here</a>
                                                            : participant.userInputs[field.formControlName] }
                                                        </div>
                                                    </div>
                                                )) 
                                            }
                                            </div>
                                        : null}
                                    </IonCol>
                                    <IonCol size="12" sizeMd="3" style={{ display: 'flex', justifyContent: 'end' }}>
                                        Status: { participant.status }
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                    )) }
                        
                </>
                : (
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12" style={{ textAlign: 'center' }}>
                                No Record Found.
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                )}
            </div>
        }
        </>
    )
};
export default CheckParticipantsTask;