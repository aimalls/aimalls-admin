import { cartOutline, cogOutline, homeOutline, list, peopleCircle, shieldCheckmark } from 'ionicons/icons'
export interface iNavigation {
    lines: "full" | "none" | "inset" | undefined,
    text: string,
    icon: string,
    color: string,
    link: string
}
export default [
    {
        lines: 'full',
        text: 'Dashboard',
        icon: homeOutline,
        color: "#FFF",
        link: "/dashboard"
    },
    {
        lines: 'full',
        text: 'Products Management',
        icon: cartOutline,
        color: "#FFF",
        link: "/dashboard/products-management"
    },
    {
        lines: 'full',
        text: 'Tasks',
        icon: list,
        color: "#FFF",
        link: "/dashboard/tasks"
    },
    {
        lines: 'full',
        text: 'Users',
        icon: peopleCircle,
        color: "#FFF",
        link: "/dashboard/users"
    },
    {
        lines: 'full',
        text: 'Roles',
        icon: shieldCheckmark,
        color: "#FFF",
        link: "/dashboard/roles"
    },
    {
        lines: 'full',
        text: 'App Settings',
        icon: cogOutline,
        color: "#FFF",
        link: "/dashboard/app-settings"
    },
    
] as iNavigation[]