import { HTTP_API } from "../helpers/http"

export interface iWhitelist {
    _id: string;
    walletAddress: string;
    fullName: string;
    email: string;
    twitterHandle: string;
    telegramHandle: string;
    facebookHandle: string;
    allocationAmount: AllocationAmount;
    mappedLoadedTokenHoldings: MappedLoadedTokenHolding[];
    status: string;
    remarks: string,
    __v: number;
    createdAt: String,
    updatedAt: String
}

export interface MappedLoadedTokenHolding {
    token: string;
    tokenName: string;
    holding: string;
    sufficient: boolean;
}

export interface AllocationAmount {
    '$numberDecimal': string;
}

export const getAllWhitelistApplicationsFromAPI = () => {
    return HTTP_API().get("/whitelist/get-all-whitelist-applications")
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const approveWhitelistApplicationToAPI = (id: iWhitelist['_id']) => {
    return HTTP_API().post("/whitelist/approve-whitelist-application", { applicationId: id })
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const denyWhitelistApplicationToAPI = (id: iWhitelist['_id'], message: string) => {
    return HTTP_API().post("/whitelist/deny-whitelist-application", { applicationId: id, message })
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}