import { HTTP_API } from "../helpers/http"

export interface iAppSetting {
    name: String,
    value: Object | string[] | string | Number | Boolean | iAppVersion
}

export interface iAppVersion {
    version: string,
    build: string,
    android_version_url: string | null,
    ios_version_url: string | null,
    version_update_text: string,
    version_update_title: string,
    action_button_text: string
}

export const getAllAppSettingsFromAPI = () => {
    return HTTP_API().get("/app-setting/get-all-app-settings")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const saveMaintenanceModeStatusToAPI = (params: any) => {
    return HTTP_API().post("/app-setting/save-maintenance-mode-status", params)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
}

export const saveVersionUpdateToAPI = (appVersion: iAppVersion) => {
    return HTTP_API().post("/app-setting/save-app-version-update", appVersion)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
}