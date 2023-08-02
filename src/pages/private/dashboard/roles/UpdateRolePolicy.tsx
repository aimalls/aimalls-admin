import { FC, useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonLoading, IonPage, IonRow, IonTextarea, useIonAlert, useIonLoading } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getRolePolicyByIDFromAPI, iRolePolicy, saveUpdatedRolePolicyToAPI } from "../../../../requests/role-policy.request";
export interface iProps {}
export const UpdateRolePolicy: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const params: { id: iRolePolicy['_id'] } = useParams();

    const rolePolicyQuery = useQuery(["rolePolicyQuery"], () => getRolePolicyByIDFromAPI(params.id))

    const rolePolicy = rolePolicyQuery.data

    const [rolePolicyForm, setRolePolicyForm] = useState<iRolePolicy>({
        _id: '',
        name: '',
        method_name: '',
        description: ''
    })
    
    useEffect(() => {
        if (rolePolicy) {
            Object.keys(rolePolicy).forEach(v => {
                handleNewPolicyFormChange(v, rolePolicy[v])
            })
        }
    }, [rolePolicy])

    const handleNewPolicyFormChange = (key: string, value: string) => {
        setRolePolicyForm((current) => {
            let curr = {...current};

            curr[key as keyof typeof curr] = value

            return curr
        })
    }

    const saveUpdatedRolePolicy = async () => {
        try {
            await present();
            const result = await saveUpdatedRolePolicyToAPI(rolePolicyForm)
            await presentAlert(result.message, [
                {
                    text: "Okay",
                    handler: () => {
                        navigation.push("/dashboard/roles/policies")
                    },
                    role: "destructive"
                }
            ])
            
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonPage>
            <IonLoading isOpen={ rolePolicyQuery.isLoading } />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Update Role Policy</span>
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                value={rolePolicyForm.name}
                                type="text"
                                placeholder="Input Role Policy Display Text"
                                fill="outline"
                                label="Role Policy Display Text"
                                labelPlacement="floating"
                                onIonInput={(e) => handleNewPolicyFormChange("name", e.detail.value!)}
                            ></IonInput>
                            <IonInput
                                value={rolePolicyForm.method_name}
                                type="text"
                                placeholder="Function/Method Name"
                                fill="outline"
                                label="Method Name"
                                labelPlacement="floating"
                                onIonInput={(e) => handleNewPolicyFormChange("method_name", e.detail.value!)}
                            ></IonInput>
                            <IonTextarea
                                value={rolePolicyForm.description}
                                placeholder="Input Policy Description"
                                fill="outline"
                                label="Description"
                                autoGrow
                                labelPlacement="floating"
                                maxlength={150}
                                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                                counter
                                style={{ minHeight: '100px' }}
                                onIonInput={(e) => handleNewPolicyFormChange("description", e.detail.value!)}
                            ></IonTextarea>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-end">
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" routerLink="/dashboard/roles/policies" color={"secondary"}>Cancel</IonButton>
                        </IonCol>
                        <IonCol size="12" sizeMd="3">
                            <IonButton expand="block" onClick={saveUpdatedRolePolicy}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default UpdateRolePolicy;