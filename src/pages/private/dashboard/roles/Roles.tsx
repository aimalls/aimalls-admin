import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllRolesFromAPI, iRole } from "../../../../requests/role.request";
export interface iProps {}
export const Roles: FC<iProps> = (props): JSX.Element => {

    const rolesQuery = useQuery(["roles-query"], () => getAllRolesFromAPI())

    const roles: iRole[] = rolesQuery.data;

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">{"Roles"}</span>
                            <IonButton routerLink="/dashboard/roles/new">Add New Role</IonButton>
                        </IonCol>
                        { roles ? (
                            <IonCol size="12">
                                <IonList lines="full">
                                    { roles.map(value => (
                                        <IonItemSliding key={value._id}>
                                            <IonItem>
                                                <IonLabel>
                                                    <div>{ value.name }</div>
                                                    <p>{ value.createdAt }</p>
                                                </IonLabel>
                                                
                                            </IonItem>
                                            <IonItemOptions slot="end">
                                                <IonItemOption color={"danger"}>Delete</IonItemOption>
                                                <IonItemOption>Update</IonItemOption>
                                            </IonItemOptions>
                                        </IonItemSliding>
                                    )) }
                                </IonList>
                            </IonCol>
                        ): null }
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Roles;