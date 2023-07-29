import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonPage, IonRouterOutlet, IonSplitPane, useIonAlert } from '@ionic/react'
import React, { FC, useContext, useEffect } from 'react'
import '../../styles/layouts/DashboardLayoutV2.scss'

import logoFull from '../../assets/images/logo-full.png'
import { homeOutline, list, logOut, mail } from 'ionicons/icons'
import { useHistory } from 'react-router'
import { UserContext } from '../../contexts/userContext'
import { Logout } from '../../requests/auth.request'
import DashboardRoutes from '../../routes/private/dashboard/DashboardRoutes'

export interface iProps {}
export const DashboardLayoutV2: FC<iProps> = (props: any): JSX.Element => {
    const navigation = useHistory();
    const { user } = useContext(UserContext)
    const [presentAlert] = useIonAlert();

    useEffect(() => {
        console.log(navigation)
    }, [navigation])

    

    const processLogout = async () => {
        try {
            const logoutRequest = await Logout()
            localStorage.removeItem("authToken")
            navigation.push("/login")

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div id='dashboard-layout'>
            <IonSplitPane when="md" contentId='dashboard-content'>
                <IonMenu contentId='dashboard-content' className='dashboard-navigation-content' type='push'>
                    <IonList style={{ background: 'none', padding: "20px 0px 20px 20px" }} lines='none' id='dashboard-list-menu'>
                        <IonItem>
                            <div className="logo-wrap">
                                <img src={logoFull} alt="logo" />
                            </div>
                        </IonItem>
                        <IonItem 
                            lines='full' 
                            routerLink='/dashboard' 
                            detail={false} 
                            className={ navigation.location.pathname == "/dashboard" ? "active" : ""}
                        >
                            <div></div>
                            <div></div>
                            <IonIcon slot='start' icon={homeOutline} color={'#fff'}></IonIcon>
                            <IonLabel className='dashboard-navigation-link'>Dashboard</IonLabel>
                        </IonItem>
                        <IonItem lines="full" 
                            routerLink="/dashboard/products-management"
                            detail={false} 
                            className={ navigation.location.pathname == "/dashboard/products-management" ? "active" : ""}
                        >
                            <div></div>
                            <div></div>
                            <IonIcon slot="start" icon={ list } color={"#FFF"}></IonIcon>
                            <IonLabel className='dashboard-navigation-link'>Products Management</IonLabel>
                        </IonItem>
                        <IonItem 
                            lines="full" 
                            routerLink="/dashboard/tasks" 
                            detail={false} 
                            className={ navigation.location.pathname == "/dashboard/tasks" ? "active" : ""}
                        >
                            <div></div>
                            <div></div>
                            <IonIcon slot="start" icon={ list } color={"#FFF"}></IonIcon>
                            <IonLabel className='dashboard-navigation-link'>Tasks</IonLabel>
                        </IonItem>
                        <IonItem lines='full' onClick={processLogout} detail={false}>
                            <IonIcon slot="start" icon={ logOut } color={"#FFF"}></IonIcon>
                            <IonLabel className='dashboard-navigation-link'>
                                Log out
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonMenu>
                <IonPage id='dashboard-content'>
                    { !!user?.email == false ? (
                        <IonContent>Unauthenticated, Login first!</IonContent>
                    ) : (
                        <>
                            <IonContent>
                                <IonRouterOutlet>
                                    <DashboardRoutes />
                                </IonRouterOutlet>
                            </IonContent>
                        </>
                    ) }
                </IonPage>
            </IonSplitPane>
        </div>
    )
}

export default DashboardLayoutV2
