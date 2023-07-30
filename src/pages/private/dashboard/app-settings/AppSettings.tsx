import { FC, useEffect, useMemo, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonItemOption, IonLabel, IonList, IonPage, IonRow, IonToggle, useIonAlert, useIonLoading } from "@ionic/react";
import "../../../../styles/pages/private/dashboard/AppSettings.scss"
import { useQuery } from "@tanstack/react-query";
import { getAllAppSettingsFromAPI, iAppSetting, iAppVersion, saveMaintenanceModeStatusToAPI } from "../../../../requests/app-settings.request";
import PageHeader from "../../../../layouts/dashboard/PageHeader";
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

    const shopperAppV = useMemo(() => {
        if (AppSettings) {
            const appVResult: iAppSetting = AppSettingsQuery.data.find((v: iAppSetting) => v.name == "shopperAppVersion");
            if (appVResult) {
                return appVResult.value
            } 
        } 
    }, [AppSettings]) as iAppVersion

    const sellerAppV = useMemo(() => {
        if (AppSettings) {
            const appVResult: iAppSetting = AppSettingsQuery.data.find((v: iAppSetting) => v.name == "sellerAppVersion");
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
            <div className="ion-hide-md-up">
                <PageHeader/>
            </div>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">App Settings</span>
                        </IonCol>
                        <IonCol size="12">
                            <IonList inset>
                                <IonItem detail button routerLink="/dashboard/app-settings/shopper-app-version">
                                    <IonLabel>Shopper App Version</IonLabel>
                                    { shopperAppV ? (
                                        <IonLabel slot="end">{ shopperAppV.version }</IonLabel>
                                    ): null }
                                </IonItem>
                                <IonItem detail button routerLink="/dashboard/app-settings/seller-app-version">
                                    <IonLabel>Seller App Version</IonLabel>
                                    { sellerAppV ? (
                                        <IonLabel slot="end">{ sellerAppV.version }</IonLabel>
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