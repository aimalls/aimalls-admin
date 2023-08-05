import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { deleteRoleToAPI, getAllRolesFromAPI, iRole } from "../../../../requests/role.request";
export interface iProps {}
export const Roles: FC<iProps> = (props): JSX.Element => {

    const rolesQuery = useQuery(["roles-query"], () => getAllRolesFromAPI())

    const roles: iRole[] = rolesQuery.data;

    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [present, dismiss] = useIonLoading();

    const deleteRole = async (_id: iRole['_id']) => {
        const role = roles.find((value) => value._id == _id);
        presentAlert(`Are you sure you want to delete ${role?.name}`, [
            {
                text: "Cancel",
                role: "cancel"
            },
            {
                text: "Yes",
                handler: async () => {
                    try {
                        await present();
                        const result = await deleteRoleToAPI(_id);
                        presentToast(result.message, 3000);
                        rolesQuery.refetch()
                    } catch (err: any) {
                        presentAlert(err)
                    } finally {
                        await dismiss();
                    }
                }
            }
        ])
        
    }

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
                                                <IonItemOption color={"danger"} onClick={() => deleteRole(value._id)}>Delete</IonItemOption>
                                                <IonItemOption routerLink={`/dashboard/roles/${value._id}/update`}>Update</IonItemOption>
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