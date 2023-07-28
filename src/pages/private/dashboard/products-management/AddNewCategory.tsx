import { FC, useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow, IonSelect, IonSelectOption, useIonAlert, useIonLoading, useIonViewWillEnter } from "@ionic/react";
import { getAllParentCategoriesFromAPI, iProductCategory } from "../../../../requests/product-category.request";
import { useQuery } from "@tanstack/react-query";
import ParentCategorySelect from "./components/ParentCategorySelect";
import NewCategoryForm from "./components/NewCategoryForm";
import { useHistory } from "react-router";
export interface iProps {}
export const AddNewCategory: FC<iProps> = (props): JSX.Element => {
    

    const navigation = useHistory();
    
   
    return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Add New Category</span>
                        </IonCol>
                        <IonCol size="12">
                            <NewCategoryForm onSuccess={() => navigation.goBack()} />
                            {/* <IonButton id="parent-category-select-btn" expand="block">Select Category</IonButton>
                            <ParentCategorySelect onSelect={(value: iProductCategory) => setSelectedParentCategory(value)} onNew={handleOnNew} /> */}
                            {/* <IonSelect
                                interfaceOptions={{ header: 'Select Category' }} 
                                cancelText="New"
                                onIonCancel={() => handleAddNewCategory('')} 
                                onIonChange={(e) => handleAddNewCategory(e.detail.value)} 
                                okText="Select" interface="action-sheet"
                                label="Please Select Category"
                            >
                                { parentCategories.map((parentCategory) => (
                                    <IonSelectOption value={parentCategory.id}>
                                        { parentCategory.name }
                                    </IonSelectOption>
                                )) }
                            </IonSelect> */}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default AddNewCategory;