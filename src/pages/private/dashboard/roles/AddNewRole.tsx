import { FC, useState } from "react";
import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonSelect, IonTextarea, useIonAlert, useIonLoading } from "@ionic/react";
import { useRolePolicy } from "../../../../hooks/useRolePolicy";
import { iRolePolicy } from "../../../../requests/role-policy.request";
import RolePolicySelect from "./RolePolicySelect";
import { useHistory } from "react-router";
import { saveNewRoleToAPI } from "../../../../requests/role.request";
export interface iProps {}
export const AddNewRole: FC<iProps> = (props): JSX.Element => {

    const navigation = useHistory();

    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    
    const { rolePolicies, rolePoliciesQuery } = useRolePolicy()

    const [selectedRolePolicies, setSelectedRolePolicies] = useState<iRolePolicy[]>([])
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    

    const handleRolePolicySelectChange = (items: iRolePolicy[]) => {
        setSelectedRolePolicies(items)
    }

    const saveNewRole = async () => {
        const mappedPolicies = selectedRolePolicies.map((policy) => {
            return policy._id
        })

        const params = {
            name: roleName,
            description: roleDescription,
            rolePolicies: mappedPolicies
        }

        try {
            await present();
            const result = await saveNewRoleToAPI(params);
            await presentAlert(result.message);
            navigation.push("/dashboard/roles");
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
        }
        
    }


    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Add New Role</span>
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                label="Role Name"
                                fill="outline"
                                labelPlacement="floating"
                                type="text"
                                style={{ marginBottom: '7px' }}
                                onIonInput={(e) => setRoleName(e.detail.value!)}
                            ></IonInput>
                            <IonTextarea
                                label="Description"
                                fill="outline"
                                labelPlacement="floating"
                                placeholder="Enter the role description"
                                style={{ minHeight: '100px' }}
                                counter
                                autoGrow
                                maxlength={150}
                                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                                onIonInput={(e) => setRoleDescription(e.detail.value!)}
                            />
                        </IonCol>
                        
                        { !rolePoliciesQuery.isLoading ? (
                            <IonCol size="12">
                                <RolePolicySelect rolePolicies={rolePolicies} selectedRolePolicies={selectedRolePolicies} onSelectionChange={handleRolePolicySelectChange} />
                            </IonCol>
                        ): null}
                    </IonRow>
                    <IonRow className="ion-justify-content-end">
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" routerLink="/dashboard/roles" color={"secondary"}>Cancel</IonButton>
                        </IonCol>
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" onClick={saveNewRole}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default AddNewRole;