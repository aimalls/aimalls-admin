import { useQuery } from "@tanstack/react-query";
import { getAllRolePoliciesFromAPI, iRolePolicy, processRolePolicyDeleteToAPI } from "../requests/role-policy.request";
import { useIonAlert, useIonLoading } from "@ionic/react";

export const useRolePolicy = () => {
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();

    const rolePoliciesQuery = useQuery(["rolePoliciesQuery"], () => getAllRolePoliciesFromAPI())
    const rolePolicies: iRolePolicy[] = rolePoliciesQuery.data;

    const processRolePolicyDelete = async (id: iRolePolicy['_id']) => {
        try {
            await present();                
            const result = await processRolePolicyDeleteToAPI(id);

            presentAlert(result.message)

            rolePoliciesQuery.refetch()
            
        } catch (err: any) {
            presentAlert(err)
        } finally {
            await dismiss();
        }
        
    }
    return {
        processRolePolicyDelete, rolePolicies, rolePoliciesQuery
    }
}