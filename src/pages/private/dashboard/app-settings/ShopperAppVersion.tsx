import { FC, useEffect, useMemo, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow, useIonAlert, useIonLoading } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getAllAppSettingsFromAPI, iAppSetting, iAppVersion, saveShopperAppVersionUpdateToAPI } from "../../../../requests/app-settings.request";
import { AppVersionUpdateModal } from "./components/AppVersionUpdateModal";
export interface iProps {}
export const ShopperAppVersion: FC<iProps> = (props): JSX.Element => {

    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const [appVersion, setAppVersion] = useState<iAppVersion>({
        version: '',
        build: '',
        android_version_url: '',
        ios_version_url: '',
        version_update_text: '',
        version_update_title: '',
        action_button_text: '',
    });

    const [appVersionUpdateModal, setAppVersionUpdateModal] = useState(false)
    const [currentSelectedAppVersionKey, setCurrentSelectedAppVersionKey] = useState<string | undefined>('test');


    const AppSettingsQuery = useQuery(["app-settings-query"], () => getAllAppSettingsFromAPI())

    const AppSettings = AppSettingsQuery.data;

    useEffect(() => {
        if (AppSettings) {
            const AppVersionResult: iAppSetting = AppSettings.find((v: iAppSetting) => v.name == "shopperAppVersion")
            
            if (AppVersionResult) {
                const AppVersion = AppVersionResult.value as iAppVersion;
                
                setAppVersion((current) => {
                    let curr = {...current}
                    curr.version = AppVersion.version;
                    curr.build = AppVersion.build;
                    curr.android_version_url = AppVersion.android_version_url;
                    curr.ios_version_url = AppVersion.ios_version_url;
                    curr.version_update_text = AppVersion.version_update_text;
                    curr.version_update_title = AppVersion.version_update_title;
                    curr.action_button_text = AppVersion.action_button_text;
                    return curr;
                })
            }
        }
    }, [AppSettings])

    const handleVersionChange = (key: string | undefined, value: string) => {
        setAppVersion((current) => {
            let curr = {...current}
            curr[key as keyof typeof curr] = value;
            return curr;
        })
        toggleAppVersionUpdateModal()
    }

    const toggleAppVersionUpdateModal = (key?: string | undefined) => {
        setCurrentSelectedAppVersionKey(key)
        setAppVersionUpdateModal(curr => !curr)
    }

    const convertedVersion = useMemo(() => {
        let v: any = [];
        Object.keys(appVersion).forEach((key) => {
            v.push({key, value: appVersion[key as keyof typeof appVersion]})
        })
        return v;
    }, [appVersion])

    const toFormal = (str: string) : string => {
        let splited_key = str.split("_");
            let pstr = "";
            for (let i=0; i<splited_key.length; i++) {
                pstr = pstr.concat(`${splited_key[i].charAt(0).toUpperCase()}${splited_key[i].slice(1)} `)
            }
            return pstr.trim();
    }

    const saveVersionUpdate = async () => {
        await present();
        try {
            const result = await saveShopperAppVersionUpdateToAPI(appVersion)
            presentAlert(result.message);
        } catch (err: any) {
            presentAlert(err.message)
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
                            <span className="page-title">App Version</span>
                            <IonButton onClick={() => saveVersionUpdate()}>Save</IonButton>
                        </IonCol>
                        <IonCol size="12">
                            <IonList>
                                { convertedVersion.map((cv: any, index: number) => (
                                    <IonItemSliding key={`cv-${index}`}>
                                        <IonItem>
                                            <IonLabel>
                                                { toFormal(cv.key) }
                                            </IonLabel>
                                            <IonLabel slot="end">
                                                { cv.value }
                                            </IonLabel>
                                        </IonItem>
                                        <IonItemOptions side="end">
                                            <IonItemOption color={"primary"} onClick={() => toggleAppVersionUpdateModal(cv.key)}>Update</IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>
                                )) }
                                
                                <IonItemSliding>
                                    <IonItem>
                                        <IonLabel>
                                            Android Version URL
                                        </IonLabel>
                                        <IonLabel slot="end">
                                            { appVersion.android_version_url }
                                        </IonLabel>
                                    </IonItem>
                                    <IonItemOptions side="end">
                                        <IonItemOption color={"primary"} onClick={() => toggleAppVersionUpdateModal("android_version_url")}>Update</IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            {appVersionUpdateModal ? (
            <AppVersionUpdateModal 
                open={ appVersionUpdateModal } 
                versionKey={ currentSelectedAppVersionKey }
                currentValue={appVersion}
                onSet={(vkey, value) => handleVersionChange(vkey, value)} 
                onDismiss={() => toggleAppVersionUpdateModal()} 
            />
            ): null}
        </IonPage>
    )
};
export default ShopperAppVersion;