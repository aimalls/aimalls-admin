import { FC } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow, IonSelect, IonTextarea } from "@ionic/react";
export interface iProps {}
export const AddNewRole: FC<iProps> = (props): JSX.Element => {
    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Add New Role</span>
                        </IonCol>
                        <IonCol size="12" className="form">
                            <IonInput
                                label="Role Name"
                                fill="outline"
                                labelPlacement="floating"
                                type="text"
                                style={{ marginBottom: '7px' }}
                            ></IonInput>
                            <IonTextarea
                                label="Description"
                                fill="outline"
                                labelPlacement="floating"
                                placeholder="Enter the role description"
                                style={{ minHeight: '100px' }}
                                counter
                                autoGrow
                                maxlength={150}
                                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                            />
                            <IonSelect></IonSelect>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default AddNewRole;