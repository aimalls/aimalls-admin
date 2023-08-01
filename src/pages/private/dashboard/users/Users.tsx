import { FC } from "react";
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonItem, IonItemSliding, IonLabel, IonList, IonListHeader, IonPage, IonRow } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersFromAPI, iUser } from "../../../../requests/user.request";
export interface iProps {}
export const Users: FC<iProps> = (props): JSX.Element => {

    const usersQuery = useQuery(["users-query"], () => getAllUsersFromAPI())

    const users: iUser[] = usersQuery.data;

    return (
        <IonPage>
            <IonContent>
                <IonGrid>

                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">{"Roles"}</span>
                            <IonButton>Add New Role</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">{"Users"}</span>
                        </IonCol>
                        <IonCol size="12">
                            { users ?(
                                <IonList>
                                    { users.map(user => (
                                        <IonItemSliding key={user._id}>
                                            <IonItem button detail routerLink={`/dashboard/users/${user._id}`}>
                                                <IonLabel>
                                                    <div>{ user.email }</div>
                                                    <p>{ user.createdAt }</p>
                                                </IonLabel>
                                            </IonItem>
                                        </IonItemSliding>
                                    )) }
                                </IonList>
                            ): null }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Users;