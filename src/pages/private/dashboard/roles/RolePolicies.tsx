import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonRow, useIonAlert, useIonLoading, useIonModal } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllRolePoliciesFromAPI, iRolePolicy, processRolePolicyDeleteToAPI } from "../../../../requests/role-policy.request";
export interface iProps {}
export const RolePolicies: FC<iProps> = (props): JSX.Element => {

    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const rolePoliciesQuery = useQuery(["rolePoliciesQuery"], () => getAllRolePoliciesFromAPI())


    const rolePolicies: iRolePolicy[] = rolePoliciesQuery.data;

  



    const processRolePolicyDelete = async (id: iRolePolicy['_id']) => {
        try {
            await present();                
            const result = await processRolePolicyDeleteToAPI(id);

            presentAlert(result.message)

            rolePoliciesQuery.refetch()
            
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
        }
        
    }

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
export default RolePolicies;