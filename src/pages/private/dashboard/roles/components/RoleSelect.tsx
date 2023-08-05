import { FC, useState } from "react";
import { CheckboxCustomEvent, IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonToolbar, useIonAlert, useIonLoading } from "@ionic/react";
import { useHistory } from "react-router";
import { iRole } from "../../../../../requests/role.request";
export interface iProps {
    roles: iRole[],
    selectedRoles: iRole[],
    onSelectionChange: (items: iRole[]) => void,
}
export const RoleSelect: FC<iProps> = ({ roles, selectedRoles, onSelectionChange }): JSX.Element => {


    const [filteredItems, setFilteredItems] = useState<iRole[]>([...roles]);

    const isChecked = (value: iRole) => {
        return selectedRoles.find((item) => item._id === value._id) !== undefined;
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
          setFilteredItems([...roles]);
        } else {
          /**
           * Otherwise, normalize the search
           * query and check to see which items
           * contain the search query as a substring.
           */
          const normalizedQuery = searchQuery.toLowerCase();
          setFilteredItems(
            roles.filter((item) => {
              return item.name.toLowerCase().includes(normalizedQuery);
            })
          );
        }
    };

    const checkboxChange = (ev: CheckboxCustomEvent) => {
        const { checked, value } = ev.detail;
    

        if (checked) {
            onSelectionChange([...selectedRoles, value]);
        } else {
            onSelectionChange(selectedRoles.filter((item) => item._id !== value._id));
        }
    };

    const handleSelectAllRolePolicies = (ev: CheckboxCustomEvent) => {
        const { checked } = ev.detail;

        if (checked) {
            onSelectionChange([...roles]);
        } else {
            onSelectionChange([]);
        }
        
    }

    return (
        <>
            <IonLabel>
                <div className="page-title">Roles</div>
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
export default RoleSelect;