import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useEffect, useMemo, useState } from "react";
import { iAppVersion } from "../../../../../requests/app-settings.request";

interface iAppVersionUpdateModalProps {
    open: boolean,
    versionKey: string | undefined,
    onSet: (key: string | undefined, value: string) => void,
    onDismiss: () => void,
    currentValue: iAppVersion
}



export const AppVersionUpdateModal: FC<iAppVersionUpdateModalProps> = ({ open, versionKey, onSet, onDismiss, currentValue }) => {

    const [inputValue, setInputValue] = useState('');


    const parsedVersionKey = useMemo(() => {
        if (versionKey) {
            let splited_key = versionKey.split("_");
            let str = "";
            for (let i=0; i<splited_key.length; i++) {
                str = str.concat(`${splited_key[i].charAt(0).toUpperCase()}${splited_key[i].slice(1)} `)
            }
            return str.trim();
        } else {
            return "";
        }
    }, [versionKey])
    
    useEffect(() => {
        
        setInputValue((c) => {
            let cc = currentValue[versionKey as keyof typeof currentValue] as string;
            return c = cc
        })
    }, [])

    return (
        <IonModal isOpen={open}>
            <IonHeader style={{ boxShadow: 'none' }}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle className="ion-text-center">Set {parsedVersionKey}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => onSet(versionKey, inputValue)}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonInput fill="outline" type="text" labelPlacement="floating" label={`Input ${ parsedVersionKey }`} value={inputValue} onIonInput={(e) => setInputValue(e.detail.value!)} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}