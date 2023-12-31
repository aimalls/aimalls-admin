import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonPage, IonRouterOutlet, IonSplitPane, useIonAlert } from '@ionic/react'
import React, { FC, useContext, useEffect } from 'react'
import '../../styles/layouts/DashboardLayoutV2.scss'

import logoFull from '../../assets/images/logo-full.png'
import { cogOutline, homeOutline, list, logOut, mail } from 'ionicons/icons'
import { useHistory } from 'react-router'
import { UserContext } from '../../contexts/userContext'
import { Logout } from '../../requests/auth.request'
import DashboardRoutes from '../../routes/private/dashboard/DashboardRoutes'
import navigationList from '../../config/navigation'

export interface iProps {}
export const DashboardLayoutV2: FC<iProps> = (props: any): JSX.Element => {
    const navigation = useHistory();
    const { user } = useContext(UserContext)
    const [presentAlert] = useIonAlert();

  

    

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
                        { navigationList.map((nav, index) => (
                            <IonItem 
                                key={`nav-${index}`}
                                lines={nav.lines} 
                                routerLink={nav.link} 
                                detail={false} 
                                className={ navigation.location.pathname == nav.link ? "active" : ""}
                            >
                                <div></div>
                                <div></div>
                                <IonIcon slot='start' icon={nav.icon} color={nav.color}></IonIcon>
                                <IonLabel className='dashboard-navigation-link'>{ nav.text}</IonLabel>
                            </IonItem>
                        )) }
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
