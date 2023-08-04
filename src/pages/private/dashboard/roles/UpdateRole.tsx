import { FC, useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow, IonTextarea, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getRoleByIDFromAPI, iRole, saveUpdatedRoleToAPI } from "../../../../requests/role.request";
import { useRolePolicy } from "../../../../hooks/useRolePolicy";
import { iRolePolicy } from "../../../../requests/role-policy.request";
import RolePolicySelect from "./RolePolicySelect";
export interface iProps {}
export const UpdateRole: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const params: {id: string} = useParams();

    const roleQuery = useQuery(["role-query"], () => getRoleByIDFromAPI(params.id))
    const { rolePolicies, rolePoliciesQuery } = useRolePolicy()

    const role: iRole = roleQuery.data

    const [selectedRolePolicies, setSelectedRolePolicies] = useState<iRolePolicy[]>([])
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");

    useEffect(() => {
        if (role) {
            setRoleName(role.name)
            setRoleDescription(role.description)
            
            setSelectedRolePolicies((current) => {
                let curr = [...current, ...role.rolePolicies] as iRolePolicy[];
                
                return curr;
            })
        }
    }, [role])


    const handleRolePolicySelectChange = (items: iRolePolicy[]) => {
        
        setSelectedRolePolicies(items)
    }

    const saveUpdatedRole = async () => {
        const mappedPolicies = selectedRolePolicies.map((policy) => {
            return policy._id
        })

        const params = {
            _id: role._id,
            name: roleName,
            description: roleDescription,
            rolePolicies: mappedPolicies
        }

        try {
            await present();
            const result = await saveUpdatedRoleToAPI(params);
            await presentToast(result.message);
            navigation.push("/dashboard/roles");
            roleQuery.refetch()
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
                            <span className="page-title">{ role ? `Update ${role.name} Role` : "Update Role" }</span>
                            
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                label="Role Name"
                                fill="outline"
                                labelPlacement="floating"
                                type="text"
                                value={roleName}
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
                                value={roleDescription}
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
                            <IonButton expand="block" onClick={saveUpdatedRole}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default UpdateRole;