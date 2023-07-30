import { IonBreadcrumb, IonBreadcrumbs, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow, useIonAlert, useIonLoading } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { deleteCategoryToAPI, getAllParentCategoriesFromAPI, getProductCategoriesByParentFromAPI, iProductCategory } from "../../../../requests/product-category.request";

import NewCategoryForm from "./components/NewCategoryForm";
import { chevronForward } from "ionicons/icons";
import UpdateCategoryForm from "./components/UpdateCategoryForm";
import PageHeader from "../../../../layouts/dashboard/PageHeader";

export interface iProps {}
export const Categories: FC<iProps> = (props): JSX.Element => {

    const [parentCategories, setParentCategories] = useState<iProductCategory[]>([])
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState<iProductCategory['_id']>('')
    const [addNewCategoryFormHidden, setAddNewCategoryFormHidden] = useState<Boolean>(true);
    const [updateCategoryFormHidden, setUpdateCategoryFormHidden] = useState<Boolean>(true);
    const [selectedProductCategoryForUpdate, setSelectedProductCategoryForUpdate] = useState<iProductCategory>();
    const [crumbs, setCrumbs] = useState<iProductCategory[]>([])


    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        loadComponentRequirements()
    }, [])

    const loadComponentRequirements = async () => {
        try {
            const result = await getAllParentCategoriesFromAPI()
            setParentCategories(result)
            setAddNewCategoryFormHidden(true)
            setCrumbs([])
            return true
        } catch (err: any) {
            presentAlert(err.message)
        }
        return false
    }

    const getProductCategoriesByParent = async (categoryId: iProductCategory['_id']) => {
        await present();
        try {
            let params = {
                categoryId
            }
            const result = await getProductCategoriesByParentFromAPI(params)
            setParentCategories(result)
        } catch (err: any) {
            presentAlert(err.message)
        } finally {
            await dismiss();
        }
    }

    useEffect(() => {
        if (currentSelectedCategory !== '') {

            const selectedCategory = parentCategories.find(v => v._id == currentSelectedCategory)
            

            const indexOfClickedCategory = crumbs.findIndex(x => x._id == currentSelectedCategory)

            setCrumbs((c) => {
                if (selectedCategory) {
                    let curr = [...c, selectedCategory] as iProductCategory[];
                    return c = curr
                }
                
                let cc = crumbs.filter((v, i) => {
                    if (i <= indexOfClickedCategory) {
                        return v
                    }
                }) as iProductCategory[]

                return c = cc
            })
            getProductCategoriesByParent(currentSelectedCategory)
        } else {
            loadComponentRequirements()
        }
    }, [currentSelectedCategory])


    const handleNewCategoryFormSuccess = () => {
        if (currentSelectedCategory !== '') {
            getProductCategoriesByParent(currentSelectedCategory)
            setUpdateCategoryFormHidden(true)
        } else {
            loadComponentRequirements()
        }
    }

    const updateCategory = (category: iProductCategory) => {
        setUpdateCategoryFormHidden(false)
        setSelectedProductCategoryForUpdate(category)
    }

    const deleteCategory = async (categoryId: String) => {
        try {
            await present();
            let params = {
                categoryId
            }
            presentAlert("Are you sure you want to delete this product category", [
                {
                    text: "Yes",
                    role: "confirm",
                    handler: async () => {
                        const result = await deleteCategoryToAPI(params);
                        loadComponentRequirements();
                        presentAlert(result.message)
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => false
                },
            ])

            
            
        } catch (error: any) {
            presentAlert(error.message)
        } finally {
            await dismiss();
        }
    }
    
    return (
        <IonPage>
            <div className="ion-hide-md-up">
                <PageHeader/>
            </div>
            <IonContent>
                <IonGrid className="container">
                    <IonRow>
                        <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="page-title">Product Categories</span>
                            <IonButton onClick={() => setAddNewCategoryFormHidden((v) => v = !v)}>New</IonButton>
                        </IonCol>
                        <IonCol size="12" className={ addNewCategoryFormHidden ? 'ion-hide' : '' }>
                            <NewCategoryForm parent={currentSelectedCategory} onSuccess={() => handleNewCategoryFormSuccess()} />
                        </IonCol>
                        { !updateCategoryFormHidden ? (
                        <IonCol size="12">
                            <UpdateCategoryForm onDismiss={() => setUpdateCategoryFormHidden(true)} productCategory={selectedProductCategoryForUpdate!} onSuccess={() => handleNewCategoryFormSuccess()} />
                        </IonCol>
                        ): null }
                        <IonCol size="12">
                            <IonBreadcrumbs>
                                <IonBreadcrumb style={{ cursor: 'pointer' }} onClick={() => setCurrentSelectedCategory('')} >Parent Categories
                                    <IonIcon slot="separator" icon={ chevronForward }></IonIcon>
                                </IonBreadcrumb>
                                { crumbs.map((crumb, index) => (
                                    <IonBreadcrumb style={{ cursor: 'pointer' }} key={index} onClick={() => setCurrentSelectedCategory(crumb._id)}>{crumb.name}
                                        <IonIcon slot="separator" icon={ chevronForward }></IonIcon>
                                    </IonBreadcrumb>
                                )) }
                            </IonBreadcrumbs>
                        </IonCol>
                        
                        <IonCol size="12">
                            <IonList lines="full">
                                { parentCategories.map((parentCategory, index) => (
                                    <div key={index}>
                                        <IonItemSliding>
                                            <IonItem button onClick={() => setCurrentSelectedCategory(parentCategory._id)}>
                                                <IonLabel>
                                                    { parentCategory.name }
                                                </IonLabel>
                                            </IonItem>
                                            <IonItemOptions side="end">
                                                <IonItemOption color={"danger"} onClick={() => deleteCategory(parentCategory._id)}>Delete</IonItemOption>
                                                <IonItemOption color={"primary"} onClick={() => updateCategory(parentCategory)}>Update</IonItemOption>
                                            </IonItemOptions>
                                        
                                        </IonItemSliding>
                                    </div>
                                )) }
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};
export default Categories;