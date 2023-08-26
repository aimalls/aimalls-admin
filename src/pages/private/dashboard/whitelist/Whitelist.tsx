import { FC, useState } from "react";
import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import PageHeader from "../../../../layouts/dashboard/PageHeader";
import useWhitelist from "../../../../hooks/useWhitelist";
export interface iProps {}
import { MappedLoadedTokenHolding, approveWhitelistApplicationToAPI, denyWhitelistApplicationToAPI, iWhitelist } from "../../../../requests/whitelist.request";
import { approveParticipantTaskToAPI, denyParticipantTaskToAPI } from "../../../../requests/user-task.request";
import { Dialog } from "@capacitor/dialog";
export const Whitelist: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const { whitelists, isWhitelistsLoading, refetch } = useWhitelist();

    const acceptApplication = async (id: iWhitelist['_id']) => {
        
        await presentAlert("Are you sure you want to approve this whitelist application?", [
            
            {
                text: "Cancel",
                role: "cancel"
            },
            {
                text: "Yes",
                handler: async () => {
                    try {
                        await present();
                        const result = await approveWhitelistApplicationToAPI(id)
                        await presentToast(result.message, 3000)
                        viewApplication()
                        await refetch();
                    } catch (err: any) {
                        await presentToast(err, 3000)
                    } finally {
                        await dismiss();
                    }
                }
            }
        ])
    }

    const denyApplication = async (id: iWhitelist['_id']) => {

        let { value } = await Dialog.prompt({
            title: "Confirm",
            message: "Please input reason why this application was rejected."
        })

        if (value === "") {
            await presentToast("Rejection reason is required.", 3000)
            return
        }


        await presentAlert(`This application will be rejected with the reason of ${value}, Please click procceed to continue.`, [
            
            {
                text: "Cancel",
                role: "cancel"
            },
            {
                text: "Proceed",
                handler: async () => {
                    try {
                        await present();
                        const result = await denyWhitelistApplicationToAPI(id, value)
                        await presentToast(result.message, 3000)
                        await refetch();
                        viewApplication()
                    } catch (err: any) {
                        await presentToast(err, 3000)
                    } finally {
                        await dismiss();
                    }
                }
            },
        ])
    }

    const [currentSelectedWhitelist, setCurrentSelectedWhitelist] = useState<iWhitelist | undefined>();

    const viewApplication = (whiteList?: iWhitelist) => {
        setCurrentSelectedWhitelist(whiteList)
    }

    return (
        <IonPage>
            <div className="ion-hide-md-up">
                <PageHeader/>
            </div>
            <IonContent>
                <IonGrid className="whitelist">
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Whitelist</span>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            { !isWhitelistsLoading ? (
                                <IonList lines="full">
                                    { whitelists.map((whitelist: iWhitelist) => (
                                        <IonItem detail key={whitelist._id} onClick={() => viewApplication(whitelist)}>
                                            <IonLabel>
                                                <div>{ whitelist.fullName }</div>
                                                <p>{ whitelist.createdAt }</p>
                                            </IonLabel>
                                            
                                        </IonItem>
                                    )) }
                                </IonList>
                            ): null }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonModal isOpen={ !!currentSelectedWhitelist } onDidDismiss={() => viewApplication()}>
                <IonHeader style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonTitle>View Application</IonTitle>
                        <IonButton fill="clear" slot="end" onClick={() => viewApplication()}>Close</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                { currentSelectedWhitelist ? (
                                    <IonList lines="full">
                                        <IonItem>
                                            <IonLabel>Wallet Address</IonLabel>
                                            <IonLabel style={{ textAlign: 'end' }}>{  currentSelectedWhitelist.walletAddress }</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Full Name</IonLabel>
                                            <IonLabel style={{ textAlign: 'end' }}>{  currentSelectedWhitelist.fullName }</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Allocation</IonLabel>
                                            <IonLabel style={{ textAlign: 'end' }}>${  currentSelectedWhitelist.allocationAmount.$numberDecimal }</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Twitter Handle</IonLabel>
                                            <IonLabel style={{ textAlign: 'end' }}>{  currentSelectedWhitelist.twitterHandle }</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Telegram Handle</IonLabel>
                                            <IonLabel style={{ textAlign: 'end' }}>{  currentSelectedWhitelist.telegramHandle }</IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>Facebook Handle</IonLabel>
                                            <IonLabel style={{ textAlign: 'end' }}>{  currentSelectedWhitelist.facebookHandle }</IonLabel>
                                        </IonItem>
                                        { currentSelectedWhitelist.mappedLoadedTokenHoldings.map((token: MappedLoadedTokenHolding, index) => (
                                            <IonItem key={`token-holding-${index}`}>
                                                <IonLabel>{ token.tokenName } Token</IonLabel>
                                                <IonLabel style={{ textAlign: 'end' }}>{  token.holding }</IonLabel>
                                            </IonItem>
                                        )) }
                                        <IonItem>
                                            <IonLabel>Status</IonLabel>
                                            <IonLabel style={{ textAlign: 'end' }}>{  currentSelectedWhitelist.status }</IonLabel>
                                        </IonItem>
                                    </IonList>
                                ): null }
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
                
                <IonFooter style={{ boxShadow: 'none' }}>
                    <IonToolbar>
                        <IonButton slot="end" fill="clear" onClick={() => denyApplication(currentSelectedWhitelist?._id!)}>Deny</IonButton>
                        <IonButton slot="end" fill="clear" onClick={() => acceptApplication(currentSelectedWhitelist?._id!)}>Approve</IonButton>
                    </IonToolbar>
                </IonFooter>
            </IonModal>
        </IonPage>
    )
};
export default Whitelist;