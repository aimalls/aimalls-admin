import { FC, useEffect, useRef, useState } from "react";
import { CheckboxCustomEvent, IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonToggle, ToggleCustomEvent, useIonAlert, useIonLoading } from "@ionic/react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { deactivateUserToAPI, getUserByIDFromAPI, iUser } from "../../../../requests/user.request";
import UserPasswordResetDialog from "./components/UserPasswordResetDialog";
export interface iProps {}

export const UserView: FC<iProps> = (props): JSX.Element => {


    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const params: {id: string} = useParams();

    const [userPasswordResetDialog, setUserPasswordResetDialog] = useState(false)

    
    const userQuery = useQuery(["user-query"], () => getUserByIDFromAPI(params.id))

    const user: iUser = userQuery.data;



    const handleOnUserDeactivate = async (ev: ToggleCustomEvent) => {

        const { checked } = ev.detail
        

        presentAlert("Are you sure you want to deactivate this user?", [
            {
                text: "Cancel",
                role: "cancel",
            },
            {
                text: "Yes",
                handler: async () => {
                    try {
                        await present();
                        const result = await deactivateUserToAPI({id: params.id, deactivate: checked})
                        await presentAlert(result.message);
                        userQuery.refetch()
                    } catch (err: any) {
                        await presentAlert(err)
                    } finally {
                        await dismiss();
                    }
                },
               
            }
        ])
    }

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    
                        { user ? (
                            <IonRow>
                                <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="page-title">
                                        User
                                    </span>
                                </IonCol>
                                <IonCol size="12">
                                    <IonList>
                                        <IonItem button>
                                            <IonLabel>Email</IonLabel>
                                            <IonLabel slot="end">{ user.email }</IonLabel>
                                        </IonItem>
                                        <IonItem button>
                                            <IonLabel>Registered Date</IonLabel>
                                            <IonLabel slot="end">{ user.createdAt }</IonLabel>
                                        </IonItem>
                                        <IonItem button>
                                            <IonLabel>Last Update</IonLabel>
                                            <IonLabel slot="end">{ user.updatedAt }</IonLabel>
                                        </IonItem>
                                        <IonItem button>
                                            <IonToggle
                                                labelPlacement="start"
                                                checked={ user.deactivated } 
                                                onIonChange={handleOnUserDeactivate}>{ user.deactivated ? "Activate" : "Deactivate" }</IonToggle>
                                        </IonItem>
                                        <IonItem button>
                                            <IonLabel>Password</IonLabel>
                                            <IonButton size="default" slot="end" onClick={() => setUserPasswordResetDialog(true)}>Reset Password</IonButton>
                                        </IonItem>
                                    </IonList>
                                </IonCol>
                            </IonRow>
                        ): (
                            <IonRow>
                                <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className="page-title">User Not Found!</span>
                                </IonCol>
                            </IonRow>
                        ) }
                </IonGrid>
            </IonContent>
            { user ? (
            <UserPasswordResetDialog isOpen={userPasswordResetDialog} userId={ user._id } onDismiss={() => setUserPasswordResetDialog(false)} />
            ) : null}
        </IonPage>
    )
};
export default UserView;