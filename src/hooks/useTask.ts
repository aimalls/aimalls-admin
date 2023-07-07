import { useQuery } from "@tanstack/react-query";
import { getAllTasksFromAPI } from "../requests/task.request";



export const useTask = () => {
    const taskQuery = useQuery({
        queryKey: ["tasks"],
        queryFn: getAllTasksFromAPI
    })

    return {tasks: taskQuery.data, isTasksLoading: taskQuery.isLoading}
}

export default useTask;