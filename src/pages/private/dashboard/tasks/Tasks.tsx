import { IonGrid, IonRow, IonCol, IonButton, IonContent, IonModal, IonHeader, IonTitle, IonToolbar, IonButtons, IonInput, IonSelect, IonSelectOption, IonTextarea, IonPage, IonItem, IonList, IonListHeader, IonCard, IonCardContent } from "@ionic/react";
import { FC, useState } from "react";
import useTask from "../../../../hooks/useTask";
import '../../../../styles/pages/private/dashboard/Task.scss'
import { useHistory } from "react-router";
import PageHeader from "../../../../layouts/dashboard/PageHeader";



export interface iProps {}
export const Tasks: FC<iProps> = (props): JSX.Element => {

    const { tasks, isTasksLoading } = useTask()

    const navigation = useHistory();

    return (
        <IonPage>
            <div className="ion-hide-md-up">
                <PageHeader/>
            </div>
            <IonContent>
                <IonGrid id="task">
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Tasks</span>
                            <IonButton routerLink="/dashboard/tasks/new">New</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            { isTasksLoading ? (
                                <div>Loading Task...</div>
                            ) : (
                                tasks && tasks.length ? (
                                    tasks.map((task: any, index: any) => (
                                        <IonList lines="full"  key={index}>
                                            <IonItem onClick={() => navigation.push(`/dashboard/tasks/task/${task._id}`)}>
                                                <IonGrid>
                                                    <IonRow className="ion-justify-content-center ion-align-items-center">
                                                        <IonCol size="12" sizeMd="3" sizeLg="2">
                                                            <div className="task-title">Title:</div>
                                                            <div className="task-title-content">{ task.taskTitle }</div>
                                                        </IonCol>
                                                        <IonCol size="12" sizeMd="5" sizeLg="6">
                                                            <div className="task-title">Description:</div>
                                                            <div className="task-title-content" dangerouslySetInnerHTML={{ __html:task.taskDescription }}></div>
                                                        </IonCol>
                                                        <IonCol size="12" sizeMd="2" sizeLg="2">
                                                            <div className="task-title">Reward:</div>
                                                            <div className="task-title-content">{ task.taskReward.amount.$numberDecimal } { task.taskReward.currency }</div>
                                                        </IonCol>
                                                        
                                                        <IonCol size="12" sizeMd="2" sizeLg="2">
                                                            <div className="task-title">Status:</div>
                                                            <div className="task-title-content">
                                                                { task.taskActiveStatus ? (
                                                                    <div style={{ color: "#2dd36f" }}>Active</div>
                                                                ) : (
                                                                    <div style={{color: "#eb445a"}}>Done</div>
                                                                ) }
                                                            </div>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonGrid>
                                            </IonItem>
                                        </IonList>
                                    ))
                                ) : (
                                    <div>No Task Available</div>
                                )
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Tasks;