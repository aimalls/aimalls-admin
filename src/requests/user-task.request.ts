import { HTTP_API } from "../helpers/http";

export const getTaskParticipantsFromAPI = (taskId: string) => {
    return HTTP_API().get("/user-task/get-tasks-participants", { params: { taskId } })
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const getAllCheckedParticipantsTaskFromAPI = (taskId: string) => {
    return HTTP_API().get("/user-task/get-all-checked-participants-task", { params: { taskId } })
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const denyParticipantTaskToAPI = (userTask: string) => {
    return HTTP_API().post("/user-task/deny-participants-task", {userTaskId: userTask})
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const approveParticipantTaskToAPI = (userTask: string) => {
    return HTTP_API().post("/user-task/approve-participants-task",  {userTaskId: userTask})
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}