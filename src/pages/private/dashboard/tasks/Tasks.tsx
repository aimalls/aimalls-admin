import { IonGrid, IonRow, IonCol, IonButton, IonContent, IonModal, IonHeader, IonTitle, IonToolbar, IonButtons, IonInput, IonSelect, IonSelectOption, IonTextarea, IonPage, IonItem, IonList, IonListHeader, IonCard, IonCardContent } from "@ionic/react";
import { FC, useState } from "react";
import useTask from "../../../../hooks/useTask";
import '../../../../styles/pages/private/dashboard/Task.scss'



export interface iProps {}
export const Tasks: FC<iProps> = (props): JSX.Element => {

    const { tasks, isTasksLoading } = useTask()

    return (
        <IonPage>
            <IonContent>
                <IonGrid id="task">
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12">
                            <IonButton routerLink="/dashboard/tasks/new">New</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            { isTasksLoading ? (
                                <div>Loading Task...</div>
                            ) : (
                                tasks && tasks.length ? (
                                    tasks.map((task: any, index: any) => (
                                        <IonList lines="full"  key={index}>
                                            <IonItem>
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
                                                        <IonCol size="12" sizeMd="6">
                                                            {/* { task.customFields?.map((field: any, index: any) => (
                                                                field?.fieldType == 'text' ? (
                                                                    <IonCol key={index} size="12" style={{ color: "#000"}}>
                                                                        <IonInput fill="solid" {...field} type="text" placeholder={field.placeholder} labelPlacement="floating"  />
                                                                    </IonCol>
                                                                ) : field?.fieldType == 'textarea'  ?
                                                                (
                                                                    <IonCol key={index} size="12" style={{ color: "#000"}}>
                                                                        <IonTextarea {...field}  fill={field.fill} placeholder={field.placeholder || ''} />
                                                                    </IonCol>
                                                                ) : field?.fieldType == 'select' ? (
                                                                    <IonCol key={index} size="12">
                                                                        <IonSelect {...field}  labelPlacement="floating">
                                                                            {field.options.map((option: any, index: any) => (
                                                                                <IonSelectOption key={`select-option-${index}`} value={option.value}>{option.label}</IonSelectOption>   
                                                                            ))}
                                                                        </IonSelect>
                                                                    </IonCol>
                                                                ) : field?.fieldType == 'file' ? (
                                                                    <IonCol size="12" key={index}>
                                                                        <input type={ field.type } accept="image/*" placeholder={field.placeholder} />
                                                                    </IonCol>
                                                                ) : null
                                                            )) } */}
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