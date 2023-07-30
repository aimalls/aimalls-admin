import { FC, useEffect, useMemo, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonItemOption, IonLabel, IonList, IonPage, IonRow, IonToggle, useIonAlert, useIonLoading } from "@ionic/react";
import "../../../../styles/pages/private/dashboard/AppSettings.scss"
import { useQuery } from "@tanstack/react-query";
import { getAllAppSettingsFromAPI, iAppSetting, iAppVersion, saveMaintenanceModeStatusToAPI } from "../../../../requests/app-settings.request";
export interface iProps { }
export const AppSettings: FC<iProps> = (props): JSX.Element => {


    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)

    const AppSettingsQuery = useQuery(["app-settings-query"], () => getAllAppSettingsFromAPI())


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const AppSettings = AppSettingsQuery.data;

    useEffect(() => {
        if (AppSettingsQuery.data) {
            const stat: iAppSetting = AppSettingsQuery.data.find((v: iAppSetting) => v.name == "isMaintenanceMode")

            if (stat) {
                setIsMaintenanceMode((c) => {
                    return c = stat.value as boolean
                })
            }



        }
    }, [AppSettings])

    const appV = useMemo(() => {
        if (AppSettings) {
            const appVResult: iAppSetting = AppSettingsQuery.data.find((v: iAppSetting) => v.name == "appVersion");
            if (appVResult) {
                return appVResult.value
            } 
        } 
    }, [AppSettings]) as iAppVersion

    const saveMaintenanceModeStatus = async (status: boolean) => {
        await present();

        try {
            let params = {
                mode: status
            }
            const saveMaintenanceModeStatus = await saveMaintenanceModeStatusToAPI(params);
            presentAlert(saveMaintenanceModeStatus.message)
        } catch (error: any) {
            presentAlert(error.message)
        } finally {
            await dismiss();
        }
    }

    const handleIsMaintenanceModeChange = async (status: boolean) => {
        setIsMaintenanceMode(status)
        saveMaintenanceModeStatus(status);

    }


    return (
        <IonPage id="app-settings">
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">App Settings</span>
                        </IonCol>
                        <IonCol size="12">
                            <IonList inset>
                                <IonItem detail button routerLink="/dashboard/app-settings/app-version">
                                    <IonLabel>App Version</IonLabel>
                                    { appV ? (
                                        <IonLabel slot="end">{ appV.version }</IonLabel>
                                    ): null }
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Maintenance Mode</IonLabel>
                                    <IonToggle checked={isMaintenanceMode} onIonChange={(e) => handleIsMaintenanceModeChange(e.detail.checked)} slot="end">
                                        {isMaintenanceMode ? 'Yes' : 'No'}
                                    </IonToggle>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default AppSettings;