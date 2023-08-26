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
import Users from "../../../pages/private/dashboard/users/Users";
import UserView from "../../../pages/private/dashboard/users/UserView";
import Roles from "../../../pages/private/dashboard/roles/Roles";
import AddNewRole from "../../../pages/private/dashboard/roles/AddNewRole";
import RolePolicies from "../../../pages/private/dashboard/roles/RolePolicies";
import AddNewRolePolicy from "../../../pages/private/dashboard/roles/AddNewRolePolicy";
import UpdateRolePolicy from "../../../pages/private/dashboard/roles/UpdateRolePolicy";
import UpdateRole from "../../../pages/private/dashboard/roles/UpdateRole";
import ProductSpecifications from "../../../pages/private/dashboard/products-management/ProductSpecifications";
import NewProductSpecification from "../../../pages/private/dashboard/products-management/NewProductSpecification";
import UpdateProductSpecification from "../../../pages/private/dashboard/products-management/UpdateProductSpecification";
import Whitelist from "../../../pages/private/dashboard/whitelist/Whitelist";

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
            <Route exact path="/dashboard/products-management/specifications">
                <ProductSpecifications />
            </Route>
            <Route exact path="/dashboard/products-management/specifications/new">
                <NewProductSpecification />
            </Route>
            <Route exact path="/dashboard/products-management/specifications/:id/update">
                <UpdateProductSpecification />
            </Route>
            <Route exact path="/dashboard/tasks/new">
                <AddNewTask />
            </Route>
            <Route exact path="/dashboard/users">
                <Users />
            </Route>
            <Route exact path="/dashboard/users/:id">
                <UserView />
            </Route>

            <Route exact path="/dashboard/roles">
                <Roles />
            </Route>
            <Route exact path="/dashboard/roles/:id/update">
                <UpdateRole />
            </Route>
            <Route exact path="/dashboard/roles/new">
                <AddNewRole />
            </Route>
            <Route exact path="/dashboard/roles/policies">
                <RolePolicies />
            </Route>
            <Route exact path="/dashboard/roles/policies/new">
                <AddNewRolePolicy />
            </Route>
            <Route exact path="/dashboard/roles/policies/:id/update">
                <UpdateRolePolicy />
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

            <Route path="/dashboard/whitelists">
                <Whitelist />
            </Route>
        </>
    )
};
export default DashboardRoutes;