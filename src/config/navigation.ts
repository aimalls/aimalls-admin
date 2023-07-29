import { cogOutline, homeOutline, list } from 'ionicons/icons'
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
        icon: list,
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
        text: 'App Settings',
        icon: cogOutline,
        color: "#FFF",
        link: "/dashboard/app-settings"
    },
    
] as iNavigation[]