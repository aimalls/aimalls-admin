import { FC, useEffect, useState } from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { getUserByIDFromAPI, iUser, saveResetPasswordToAPI, saveUpdatedUserRole } from "../../../../../requests/user.request";
import { refresh } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import RoleSelect from "../../roles/components/RoleSelect";
import { getAllRolesFromAPI, iRole } from "../../../../../requests/role.request";
import { useHistory } from "react-router";
export interface iProps {
    isOpen: boolean,
    userId: iUser['_id'],
    onDismiss: () => void,
    onSuccess: () => void
}
export const UserRoleChangeDialog: FC<iProps> = ({ isOpen, userId, onDismiss, onSuccess }): JSX.Element => {

    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();


    const userQuery = useQuery(["user-query"], () => getUserByIDFromAPI(userId))

    const user: iUser = userQuery.data;

    const [selectedRoles, setSelectedRoles] = useState<iRole[]>([])

    const rolesQuery = useQuery(["roles-query"], () => getAllRolesFromAPI())

    const roles: iRole[] = rolesQuery.data;


    useEffect(() => {
        setSelectedRoles((current) => {
            let curr = [...user.roles] as iRole[]
            return curr;
        })
    }, [user])

    const handleUserRoleSelectChange = (items: iRole[]) => {
        setSelectedRoles(items)
    }

    const saveUpdatedRole = async () => {
        const mappedRoles = selectedRoles.map((role) => {
            return role._id
        })
        let params = {
            userId: userId,
            roles: mappedRoles
        }

        try {
            await present();
            const result = await saveUpdatedUserRole(params);
            await presentToast(result.message, 3000);
            onSuccess()
        } catch (err: any) {
            presentAlert(err)
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
                    <IonTitle className="ion-text-center">Change role for { user ? user.email : null}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => saveUpdatedRole()}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                { !rolesQuery.isLoading ? (
                    <RoleSelect roles={roles} selectedRoles={selectedRoles} onSelectionChange={handleUserRoleSelectChange} />
                ): null }
            </IonContent>
        </IonModal>
    )
};
export default UserRoleChangeDialog;