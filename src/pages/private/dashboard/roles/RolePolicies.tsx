import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllRolePoliciesFromAPI } from "../../../../requests/role-policy.request";
export interface iProps {}
export const RolePolicies: FC<iProps> = (props): JSX.Element => {

    const rolePoliciesQuery = useQuery(["rolePoliciesQuery"], () => getAllRolePoliciesFromAPI())


    const rolePolicies = rolePoliciesQuery.data;

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Role Policies</span>
                            <IonButton routerLink="/dashboard/roles/policies/new">New Role Policy</IonButton>
                        </IonCol>
                        { rolePolicies ? (
                            <IonCol size="12">
                                { JSON.stringify(rolePolicies) }
                            </IonCol>
                        ): null }
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default RolePolicies;