import { FC } from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { deleteProductSpecificationToAPI, getAllProductSpecificationsFromAPI, iProductSpecification } from "../../../../requests/product-specification.request";
export interface iProps {}
export const ProductSpecifications: FC<iProps> = (props): JSX.Element => {
    const navigation = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();

    const productSpecificationsQuery = useQuery(["product-specifications-query"], () => getAllProductSpecificationsFromAPI())

    const productSpecifications: iProductSpecification[] = productSpecificationsQuery.data;
    

    const handleProductSpecificationDelete = async (productSpecificationID: iProductSpecification['_id']) => {
        await presentAlert("Are you sure you want to delete this product specification?", [
            {
                text: "Cancel",
                role: "cancel"
            },
            {
                text: "Yes",
                handler: async () => {
                    try {
                        await present();
                        const result = await deleteProductSpecificationToAPI(productSpecificationID)
                        presentToast(result.message, 3000)
                        productSpecificationsQuery.refetch()
                    } catch (err: any) {
                        presentToast(err, 3000)
                    } finally {
                        await dismiss();
                    }
                }
            }
        ])
    }

    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Product Specifications</span>
                            <IonButton routerLink="specifications/new">New Specification</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            { productSpecifications ? (
                            <IonList>
                                { productSpecifications.map((productSpecification, index) => (
                                    <IonItemSliding key={`product-specification-${index}`}>
                                        <IonItem>
                                            <IonLabel>
                                                { productSpecification.name }
                                            </IonLabel>
                                        </IonItem>
                                        <IonItemOptions slot="end">
                                            <IonItemOption color={"danger"} onClick={() => handleProductSpecificationDelete(productSpecification._id)}>Delete</IonItemOption>
                                            <IonItemOption color={"primary"} routerLink={`/dashboard/products-management/specifications/${productSpecification._id}/update`}>Update</IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>
                                )) }
                            </IonList>
                            ): "No Product Specifications Found" }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default ProductSpecifications;