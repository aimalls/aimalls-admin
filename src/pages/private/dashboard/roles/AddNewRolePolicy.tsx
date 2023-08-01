import { FC, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow, IonTextarea, useIonAlert, useIonLoading } from "@ionic/react";
import { iRolePolicy, saveNewRolePolicyToAPI } from "../../../../requests/role-policy.request";
import { useHistory } from "react-router";
export interface iProps {}
export const AddNewRolePolicy: FC<iProps> = (props): JSX.Element => {

    const navigation = useHistory();

    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const [newRolePolicyForm, setNewRolePolicyForm] = useState<iRolePolicy>({
        name: '',
        method_name: '',
        description: ''
    })

    const handleNewPolicyFormChange = (key: string, value: string) => {
        setNewRolePolicyForm((current) => {
            let curr = {...current};

            curr[key as keyof typeof curr] = value

            return curr
        })
    }

    const saveNewRolePolicy = async () => {
        await present();
        try {
            const result = await saveNewRolePolicyToAPI(newRolePolicyForm);
            presentAlert(result.message, [
                {
                    text: "Okay",
                    handler: () => {
                        navigation.push("/dashboard/roles/policies")
                    }
                }
            ])
            
        } catch (error: any) {
            // console.log(error.data)
            presentAlert(error)
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
                            <span className="page-title">New Role Policy</span>
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                type="text"
                                placeholder="Input Role Policy Display Text"
                                fill="outline"
                                label="Role Policy Display Text"
                                labelPlacement="floating"
                                onIonInput={(e) => handleNewPolicyFormChange("name", e.detail.value!)}
                            ></IonInput>
                            <IonInput
                                type="text"
                                placeholder="Function/Method Name"
                                fill="outline"
                                label="Method Name"
                                labelPlacement="floating"
                                onIonInput={(e) => handleNewPolicyFormChange("method_name", e.detail.value!)}
                            ></IonInput>
                            <IonTextarea
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
                            <IonButton expand="block" onClick={saveNewRolePolicy}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default AddNewRolePolicy;