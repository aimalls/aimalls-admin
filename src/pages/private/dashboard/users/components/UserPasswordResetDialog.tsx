import { FC, useEffect, useState } from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonToast } from "@ionic/react";
import { getUserByIDFromAPI, iUser, saveResetPasswordToAPI } from "../../../../../requests/user.request";
import { refresh } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
export interface iProps {
    isOpen: boolean,
    userId: iUser['_id'],
    onDismiss: () => void
}
export const UserPasswordResetDialog: FC<iProps> = ({ isOpen, userId, onDismiss }): JSX.Element => {

    const [present, dismiss] = useIonLoading();
    const [presentToast] = useIonToast();

    const [newPassword, setNewPassword] = useState('')

    const userQuery = useQuery(["user-query"], () => getUserByIDFromAPI(userId))

    const user: iUser = userQuery.data;

    const generatePassword = (length: number) => {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setNewPassword(retVal)
    }
    
    useEffect(() => {

        generatePassword(10);
    }, [])

    const resetPassword = async () => {
        try {
            await present();
            const result = await saveResetPasswordToAPI({ userId, newPassword });
            presentToast(result.message, 3000)
            onDismiss()
        } catch (err: any) {
            presentToast(err, 3000)
        } finally {
            await dismiss();
        }
    }

    return (
        <IonModal isOpen={isOpen} onWillDismiss={onDismiss}>
            <IonHeader style={{ boxShadow: 'none' }}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Password Reset for { user ? user.email : null}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => resetPassword()}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonItem>
                    <IonInput 
                        label="Password"
                        value={newPassword}
                        labelPlacement="floating"
                        onIonInput={(e) => setNewPassword(e.detail.value!)}
                    >
                    </IonInput>
                    <IonButton slot="end" onClick={() => generatePassword(10)}>
                        <IonIcon icon={ refresh }></IonIcon>
                    </IonButton>
                </IonItem>
            </IonContent>
        </IonModal>
    )
};
export default UserPasswordResetDialog;