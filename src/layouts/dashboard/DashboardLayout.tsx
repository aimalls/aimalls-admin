import { IonBreadcrumb, IonBreadcrumbs, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonRow, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import DashboardRoutes from "../../routes/private/dashboard/DashboardRoutes";
import { UserContext } from "../../contexts/userContext";
import { mail, menuOutline, chevronForward } from "ionicons/icons";
import logoFull from "../../assets/images/logo-full.png";
import { useHistory, useLocation } from "react-router";
import { Logout } from "../../requests/auth.request";
import '../../styles/layouts/DashboardLayout.scss'

export interface iProps {

}

interface iCrumb {
    text: string,
    link: string
}

export const DashboardLayout: FC<iProps> = (props): JSX.Element => {

    const { user } = useContext(UserContext)
    const navigation = useHistory();
    const location = useLocation();

    const crumbs = useMemo<iCrumb[]>(() => {
        let currentLink = '';
        return navigation.location.pathname.split('/')
            .filter(crumb => crumb !== '')
            .map(crumb => {
                currentLink += `/${crumb}`
                return {text: crumb, link: currentLink};
            })
    }, [location])

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
        
        <div id="dashboard">
            <IonSplitPane when="md" contentId="dashboard-content">
                <IonMenu contentId='dashboard-content' className='dashboard-navigation-content' type='push' >
                    <div className='logo-wrap'>
                        <img src={logoFull} className='logo' />
                    </div>
                    <IonContent className='ion-padding'>
                        <IonList>
                            <IonItem lines="full" routerLink="/dashboard">
                                <IonLabel slot='end' color={'primary'} className='dashboard-navigation-link'>Dashboard</IonLabel>
                            </IonItem>
                            <IonItem lines="full" routerLink="/dashboard/tasks">
                                <IonLabel slot='end' color={'primary'} className='dashboard-navigation-link'>Tasks</IonLabel>
                            </IonItem>
                            <IonItem lines='full' onClick={processLogout}>
                                <IonLabel slot='end' color={'primary'} className='dashboard-navigation-link'>
                                    Log out
                                </IonLabel>
                            </IonItem>
                            <IonButton className='ion-margin-top' fill='solid' shape='round' expand="full" style={{textTransform: "lowercase"}}>
                                <IonIcon slot="start" icon={mail}></IonIcon>
                                support@aimalls.app
                            </IonButton>
                        </IonList>
                    </IonContent>
                </IonMenu>

                <IonPage id="dashboard-content">
                    {!!user?.email == false ? (
                        <IonContent>Unauthenticated!, Login first!</IonContent>
                        ): (
                        <>
                            <IonHeader className='ion-padding-horizontal'>
                                <IonToolbar style={{height: "70px", display: "flex"}}>
                                        <IonMenuToggle slot='end' >
                                            <IonButton fill='solid' color={"primary"}>
                                                <IonIcon slot='icon-only' icon={menuOutline}></IonIcon>
                                            </IonButton>
                                        </IonMenuToggle>
                                    <IonTitle>
                                        <img src={logoFull} className='logo'  height={50}/>
                                    </IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            
                            <IonHeader className="ion-no-border">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonBreadcrumbs>
                                                { crumbs.map((crumb, index) => (
                                                    <IonBreadcrumb routerLink={crumb.link} key={index}>{crumb.text}
                                                        <IonIcon slot="separator" icon={ chevronForward }></IonIcon>
                                                    </IonBreadcrumb>
                                                )) }
                                            </IonBreadcrumbs>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonHeader>
                            
                            <IonContent>
                                <IonRouterOutlet>
                                    <DashboardRoutes />
                                </IonRouterOutlet>
                            </IonContent>
                        </>
                    )}
                </IonPage>
            </IonSplitPane>
            
        </div>
    )
};
export default DashboardLayout;