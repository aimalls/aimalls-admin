import { tCustomField } from "../components/custom-field/AddCustomField";
import { HTTP_API } from "../helpers/http";

export interface iTask {
    taskTitle: string,
    taskReward: TaskReward,
    taskDescription: string,
    customFields: tCustomField[],
    taskActiveStatus: boolean
}

export interface iTaskV2 {
    taskTitle: string,
    taskReward: TaskRewardV2,
    taskDescription: string,
    customFields: tCustomField[],
    taskActiveStatus: boolean
}

export interface TaskRewardV2 {
    currency: string;
    amount: Amount;
}

export interface TaskReward {
    currency: string;
    amount: number;
  }
  
  export interface Amount {
    '$numberDecimal': number;
  }

export const saveNewTaskToAPI = (task: iTask) => {
    return HTTP_API().post("/task/new", task)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const getAllTasksFromAPI = () => {
    return HTTP_API().get("/task/get-all-tasks")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const getTaskByIDFromAPI = (id: string) => {
    return HTTP_API().get("/task/get-task-by-id", { params: {id} })
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}