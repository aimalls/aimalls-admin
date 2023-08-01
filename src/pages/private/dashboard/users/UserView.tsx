import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonToggle } from "@ionic/react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserByIDFromAPI, iUser } from "../../../../requests/user.request";
export interface iProps {}

export const UserView: FC<iProps> = (props): JSX.Element => {

    const params: {id: string} = useParams();
    
    const userQuery = useQuery(["user-query"], () => getUserByIDFromAPI(params.id))

    const user: iUser = userQuery.data;


    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    
                        { user ? (
                            <IonRow>
                                <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="page-title">
                                        User
                                    </span>
                                </IonCol>
                                <IonCol size="12">
                                    <IonList>
                                        <IonItem button>
                                            <IonLabel>Email</IonLabel>
                                            <IonLabel slot="end">{ user.email }</IonLabel>
                                        </IonItem>
                                        <IonItem button>
                                            <IonLabel>Registered Date</IonLabel>
                                            <IonLabel slot="end">{ user.createdAt }</IonLabel>
                                        </IonItem>
                                        <IonItem button>
                                            <IonLabel>Last Update</IonLabel>
                                            <IonLabel slot="end">{ user.updatedAt }</IonLabel>
                                        </IonItem>
                                        <IonItem button>
                                            <IonLabel>Deactivate</IonLabel>
                                            <IonToggle slot="end"></IonToggle>
                                        </IonItem>
                                        <IonItem button>
                                            <IonLabel>Password</IonLabel>
                                            <IonButton size="default" slot="end">Reset Password</IonButton>
                                        </IonItem>
                                    </IonList>
                                </IonCol>
                            </IonRow>
                        ): (
                            <IonRow>
                                <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="page-title">User Not Found!</span>
                                </IonCol>
                            </IonRow>
                        ) }
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default UserView;