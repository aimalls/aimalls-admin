import { FC } from "react";
import { Route, } from "react-router";

import Dashboard from "../../../pages/private/dashboard/Dashboard";

import Tasks from "../../../pages/private/dashboard/tasks/Tasks";
import AddNewTask from "../../../pages/private/dashboard/tasks/AddNewTask";
import Task from "../../../pages/private/dashboard/tasks/Task";
import ProductsManagement from "../../../pages/private/dashboard/products-management/ProductsManagement";
import Categories from "../../../pages/private/dashboard/products-management/Categories";
import AppSettings from "../../../pages/private/dashboard/app-settings/AppSettings";
import ShopperAppVersion from "../../../pages/private/dashboard/app-settings/ShopperAppVersion";
import SellerAppVersion from "../../../pages/private/dashboard/app-settings/SellerAppVersion";

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
            <Route exact path="/dashboard/products-management">
                <ProductsManagement />
            </Route>
            <Route exact path="/dashboard/products-management/categories">
                <Categories />
            </Route>
            <Route exact path="/dashboard/tasks/new">
                <AddNewTask />
            </Route>

            <Route exact path="/dashboard/app-settings">
                <AppSettings />
            </Route>
            <Route exact path="/dashboard/app-settings/shopper-app-version">
                <ShopperAppVersion />
            </Route>
            <Route exact path="/dashboard/app-settings/seller-app-version">
                <SellerAppVersion />
            </Route>

            <Route path="/dashboard/tasks/task/:id">
                <Task />
            </Route>
        </>
    )
};
export default DashboardRoutes;