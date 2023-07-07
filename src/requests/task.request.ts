import { tCustomField } from "../components/custom-field/AddCustomField";
import { HTTP_API } from "../helpers/http";

export interface iTask {
    taskTitle: string,
    taskReward: {
        currency: string,
        amount: number
    },
    taskDescription: string,
    customFields: tCustomField[],
    taskActiveStatus: boolean
}

export const saveNewTaskToAPI = (task: iTask) => {
    return HTTP_API().post("/task/new", task)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}