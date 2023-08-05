import React, { useEffect, useState } from 'react'
import "../../../styles/pages/public/auth/Login.scss"
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton, IonRouterLink, IonItem, IonIcon, useIonToast } from '@ionic/react'
import Logo from '../../../assets/images/logo-full.png'

import gmailIcon from '../../../assets/images/google.png'
import loginBg from '../../../assets/images/auth-bg2.jpg'
import loginBgPlaceholder from '../../../assets/images/auth-bg2-placeholder.jpg'

import { GoogleLogin, Login as LoginRequest } from '../../../requests/auth.request'
import getGoogleAuthURL from '../../../helpers/googleAuth'
import { useLocalStorage } from 'usehooks-ts'
import { AxiosResponse } from 'axios'
import { useHistory } from 'react-router'
import { useProgressiveImage } from '../../../hooks/ProgressiveImage'
import { lockClosed, mail } from 'ionicons/icons'

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authToken, setAuthToken] = useLocalStorage<string | AxiosResponse>('authToken', '')

    const [presentToast] = useIonToast();

    const loaded_bg = useProgressiveImage(loginBg);
    
    const history = useHistory();

    const processLogin = async (code?: string) => {
        try {
            if (code) {
                await GoogleLogin(code)
            } else {
                const token = await LoginRequest(email, password)
                if (!!token) {
                    setAuthToken(token.data.authToken)
                    history.push("/dashboard")
                }
            }
        } catch (error: any) {
            presentToast(error, 3000)
        }
    }

    var url_string = window.location.href
    var url = new URL(url_string)
    var code = url.searchParams.get("code") 
    var authParam = url.searchParams.get("token");
    var successParam = url.searchParams.get("success");

    if (code !== null) {
        processLogin(code)
    }

    useEffect(() => {
        if (!!authParam && !!successParam) {
            setAuthToken(authParam);
            history.push("/dashboard")
        }
    }, [])

 
    return (
        <div id='login'>
            <IonPage>
                <IonContent>
                    <div className="login-content">
                        <IonGrid className='ion-no-padding'>
                            <IonRow className='ion-justify-content-between'>
                                <IonCol size='12' sizeSm='12' sizeMd='8'>
                                    <div className="login-column" style={{ backgroundImage: `url(${ loaded_bg || loginBgPlaceholder })` }}>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonCol size='12'>
                                                <div className='logo-mobile'>
                                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "30px" }}>
                                                        <img src={ Logo } alt='aimalls' />
                                                    </div>
                                                </div>
                                                <div className="login-title" style={{ marginBottom: '30px' }}>Login to Your Account</div>
                                            </IonCol>
                                            <IonCol size='12' sizeSm='9' sizeMd='7'>
                                                <IonButton expand='block' color={'light'} size='large' href={getGoogleAuthURL(import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URL)}>
                                                    <img src={gmailIcon} alt="Google Icon" height={25} />
                                                    <div className='sign-up-title'>Sign In with Google</div>
                                                </IonButton>
                                                <div className='line-break'>or</div>
                                            </IonCol>
                                            <IonCol size='12' sizeSm='9' sizeMd='7' className='ion-padding-top'>
                                                
                                                <IonItem className="inputs  ion-margin-bottom">
                                                    <IonIcon icon={mail} color='light' slot='end' size='large'></IonIcon>
                                                    <IonInput 
                                                        label='Email' 
                                                        type='email'
                                                        required
                                                        aria-label='Email'
                                                        labelPlacement="floating" 
                                                        placeholder='Enter your Email' 
                                                        value={email}
                                                        onIonInput={(val) => setEmail(val.detail.value!)}
                                                    />
                                                </IonItem>
                                                
                                                <IonItem  className="inputs">
                                                    <IonIcon icon={lockClosed} color='light' slot='end' size='large'></IonIcon>
                                                    <IonInput
                                                        type='password' 
                                                        label='Password' 
                                                        aria-label='Password'
                                                        labelPlacement="floating"
                                                        placeholder='Enter your Password'
                                                        value={password}
                                                        required
                                                        onIonInput={(val) => setPassword(val.detail.value!)}
                                                    />
                                                </IonItem>
                                                <IonButton 
                                                    expand='block' 
                                                    shape='round' 
                                                    style={{marginTop: "50px", textTransform: "capitalize", fontFamily: "WorkSans-Regular"}} 
                                                    size='large' 
                                                    onClick={() => processLogin()}
                                                >
                                                    Login
                                                </IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                                <IonCol size='12' sizeSm='6' sizeMd='4' >
                                    <div className="welcome-admin-column">
                                        <IonRow className='ion-justify-content-center'>
                                            <IonCol size='12'>
                                                <IonRouterLink routerLink='/'><div style={{ display: 'flex', justifyContent: 'center', marginBottom: "30px" }}><img src={ Logo } alt='aimalls' /></div></IonRouterLink>
                                                <div className="welcome-admin-title">Welcome back to the AIMalls admin!</div>
                                                <div className="welcome-admin-description">
                                                We've missed your expertise in managing our virtual marketplace. Get ready to dive back into the world of e-commerce!
                                                </div>
                                            </IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                    </IonContent>
            </IonPage>
        </div>
    )
}

export default Login
