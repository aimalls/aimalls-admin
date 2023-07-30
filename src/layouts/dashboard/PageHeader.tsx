import { IonButton, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { menuOutline } from "ionicons/icons";
import { FC } from "react";
import logoFull from "../../assets/images/logo-full.png";

export interface iProps {}
export const PageHeader: FC<iProps> = (props): JSX.Element => {
    return (
        <IonHeader style={{ boxShadow: 'none', background: 'var(--ion-color-primary)' }}>
            <IonToolbar color="clear" style={{height: "70px", display: "flex", boxShadow: 'none'}}>
                    <IonMenuToggle slot='end' >
                        <IonButton fill='clear' color={"light"}>
                            <IonIcon slot='icon-only' icon={menuOutline}></IonIcon>
                        </IonButton>
                    </IonMenuToggle>
                <IonTitle>
                    <img src={logoFull} className='logo'  height={50}/>
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    )
};
export default PageHeader;