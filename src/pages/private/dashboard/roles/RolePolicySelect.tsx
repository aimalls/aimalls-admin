import { FC, useState } from "react";
import { CheckboxCustomEvent, IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonToolbar, useIonAlert, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router";
import { iRolePolicy } from "../../../../requests/role-policy.request";
export interface iProps {
    rolePolicies: iRolePolicy[],
    selectedRolePolicies: iRolePolicy[],
    onSelectionChange: (items: iRolePolicy[]) => void,
}
export const RolePolicySelect: FC<iProps> = ({ rolePolicies, selectedRolePolicies, onSelectionChange }): JSX.Element => {


    const [filteredItems, setFilteredItems] = useState<iRolePolicy[]>([...rolePolicies]);

    const isChecked = (value: iRolePolicy) => {
        return selectedRolePolicies.find((item) => item._id === value._id) !== undefined;
    };

    const searchbarInput = (ev: any) => {
        filterList(ev.target.value);
    };
    

    const filterList = (searchQuery: string | null | undefined) => {
        /**
         * If no search query is defined,
         * return all options.
         */
        if (searchQuery === undefined || searchQuery === null) {
          setFilteredItems([...rolePolicies]);
        } else {
          /**
           * Otherwise, normalize the search
           * query and check to see which items
           * contain the search query as a substring.
           */
          const normalizedQuery = searchQuery.toLowerCase();
          setFilteredItems(
            rolePolicies.filter((item) => {
              return item.name.toLowerCase().includes(normalizedQuery);
            })
          );
        }
    };

    const checkboxChange = (ev: CheckboxCustomEvent) => {
        const { checked, value } = ev.detail;
    

        if (checked) {
            onSelectionChange([...selectedRolePolicies, value]);
        } else {
            onSelectionChange(selectedRolePolicies.filter((item) => item._id !== value._id));
        }
    };

    const handleSelectAllRolePolicies = (ev: CheckboxCustomEvent) => {
        const { checked } = ev.detail;

        if (checked) {
            onSelectionChange([...rolePolicies]);
        } else {
            onSelectionChange([]);
        }
        
    }

    return (
        <>
            <IonLabel>
                <div className="page-title">Role Policies</div>
            </IonLabel>
            <IonSearchbar onIonInput={searchbarInput}></IonSearchbar>
            <IonList lines="full">
                <IonItem>
                    <IonCheckbox onIonChange={handleSelectAllRolePolicies}>
                        All
                    </IonCheckbox>
                </IonItem>
                {filteredItems.map((item) => (
                    <IonItem key={item._id}>
                        <IonCheckbox value={item} checked={isChecked(item)} onIonChange={checkboxChange}>
                            {item.name}
                        </IonCheckbox>
                    </IonItem>
                ))}
            </IonList>
        </>
    )
};
export default RolePolicySelect;