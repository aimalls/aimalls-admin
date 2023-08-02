import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonRow, useIonAlert, useIonLoading, useIonModal } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllRolePoliciesFromAPI, iRolePolicy, processRolePolicyDeleteToAPI } from "../../../../requests/role-policy.request";
import { useRolePolicy } from "../../../../hooks/useRolePolicy";
export interface iProps {}
export const RolePolicies: FC<iProps> = (props): JSX.Element => {

    const { processRolePolicyDelete, rolePoliciesQuery, rolePolicies } = useRolePolicy()

    return (
        <IonPage>
            <IonLoading isOpen={ rolePoliciesQuery.isLoading } />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Role Policies</span>
                            <IonButton routerLink="/dashboard/roles/policies/new">New Role Policy</IonButton>
                        </IonCol>
                        { rolePolicies ? (
                            <IonCol size="12">
                                <IonList>
                                    { rolePolicies.map(value => (
                                        <IonItemSliding key={value._id}>
                                            <IonItem>
                                                <IonLabel>
                                                    <div>{ value.name }</div>
                                                    <p>{ value.createdAt }</p>
                                                </IonLabel>
                                                
                                            </IonItem>
                                            <IonItemOptions slot="end">
                                                <IonItemOption color={"danger"} onClick={() => processRolePolicyDelete(value._id)}>Delete</IonItemOption>
                                                <IonItemOption routerLink={`/dashboard/roles/policies/${value._id}/update`}>Update</IonItemOption>
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
export default RolePolicies;