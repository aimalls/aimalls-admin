import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonLabel, IonSegment, IonSegmentButton, IonToolbar, SegmentValue } from "@ionic/react";
import { FC, useState } from "react";
import { useParams } from "react-router";
import ParticipantsList from "./components/ParticipantsList";
import { getTaskByIDFromAPI, iTask, iTaskV2 } from "../../../../requests/task.request";
import { useQuery } from "@tanstack/react-query";
import { getAllCheckedParticipantsTaskFromAPI, getTaskParticipantsFromAPI } from "../../../../requests/user-task.request";
import CheckParticipantsTask from "./components/CheckParticipantsTask";
import PageHeader from "../../../../layouts/dashboard/PageHeader";

export interface iProps {}
export const Task: FC<iProps> = (props): JSX.Element => {

    const params: {id: string} = useParams();
    const [currentSegment, setCurrentSegment] = useState<SegmentValue>("participants");

    const taskQuery = useQuery(["task"], () => getTaskByIDFromAPI(params.id))
    
    const task: iTaskV2 = taskQuery.data;
    const isTaskLoading = taskQuery.isLoading;

    return (
        <IonPage>
            <div className="ion-hide-md-up">
                <PageHeader/>
            </div>
            <IonContent>
                <IonGrid>
                    { task ?
                    <IonRow>
                        <IonCol size="12" sizeMd="4">
                            <div>Task: { task.taskTitle }</div>
                            {/* <div>Reward: { `${task.taskReward.amount.$numberDecimal} ${task.taskReward.currency}` }</div> */}
                        </IonCol>
                    </IonRow>
                    : null }
                    <IonRow>
                        
                        <IonCol size="12">
                            <IonSegment value={currentSegment} onIonChange={(e) => setCurrentSegment(e.detail.value!)}>
                                <IonSegmentButton value="participants">
                                    <IonLabel>Participants</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="checked">
                                    <IonLabel>Checked</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="settings">
                                    <IonLabel>Settings</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        { currentSegment == 'participants' ? 
                            <IonCol size="12">
                                <ParticipantsList taskId={ params.id } />
                            </IonCol>
                        : currentSegment == 'checked' ?
                            <IonCol size="12">
                                <CheckParticipantsTask taskId={ params.id } />
                            </IonCol>
                        : currentSegment == 'settings' ?
                            <IonCol size="12">
                                Settings
                            </IonCol>
                        : null}
                            
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Task;