import { FC } from "react";
import { Route } from "react-router";

import Dashboard from "../../../pages/private/dashboard/Dashboard";

import Tasks from "../../../pages/private/dashboard/tasks/Tasks";
import AddNewTask from "../../../pages/private/dashboard/tasks/AddNewTask";

export interface iProps {}
export const DashboardRoutes: FC<iProps> = (props): JSX.Element => {
    return (
        <>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route exact path="/dashboard/tasks">
                <Tasks />
            </Route>
            <Route exact path="/dashboard/tasks/new">
                <AddNewTask />
            </Route>
        </>
    )
};
export default DashboardRoutes;