import React, { useEffect, useState } from 'react'
import "../../../styles/pages/public/auth/Login.scss"
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton, IonRouterLink } from '@ionic/react'
import Logo from '../../../assets/images/logo-full.png'

import gmailIcon from '../../../assets/images/google.png'

import { GoogleLogin, Login as LoginRequest } from '../../../requests/auth.request'
import getGoogleAuthURL from '../../../helpers/googleAuth'
import { useLocalStorage } from 'usehooks-ts'
import { AxiosResponse } from 'axios'
import { useHistory } from 'react-router'

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authToken, setAuthToken] = useLocalStorage<string | AxiosResponse>('authToken', '')

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
            alert(error.response.data.error)
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
                                <IonCol size='12' sizeSm='6' sizeMd='8'>
                                    <div className="login-column">
                                        <IonRow className='ion-justify-content-center'>
                                            <IonCol size='12'>
                                                <div className="login-title">Login to Your Account</div>
                                                <div className='login-description'>Welcome back</div>
                                            </IonCol>
                                            <IonCol size='12' sizeSm='9' sizeMd='7'>
                                                <IonButton expand='block' color={'light'} size='large' href={getGoogleAuthURL(import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URL)}>
                                                    <img src={gmailIcon} alt="Google Icon" height={25} />
                                                    <div className='sign-up-title'>Sign In with Google</div>
                                                </IonButton>
                                                <div className='line-break'>or</div>
                                            </IonCol>
                                            <IonCol size='12' sizeSm='9' sizeMd='7' className='ion-padding-top'>
                                                <IonInput 
                                                    label='Email' 
                                                    className='inputs ion-margin-bottom'
                                                    type='email'
                                                    required
                                                    labelPlacement="floating" 
                                                    placeholder='Enter your Email' 
                                                    value={email}
                                                    onIonChange={(val) => setEmail(val.detail.value!)}
                                                />
                                                <IonInput
                                                    type='password' 
                                                    label='Password' 
                                                    className='inputs ion-margin-bottom' 
                                                    labelPlacement="floating"
                                                    placeholder='Enter your Password'
                                                    value={password}
                                                    required
                                                    onIonChange={(val) => setPassword(val.detail.value!)}
                                                />

                                                <IonButton expand='block' shape='round' style={{marginTop: "50px"}} size='large' onClick={() => processLogin()}>Login</IonButton>
                                                
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
