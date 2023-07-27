import { HTTP_API } from "../helpers/http"

export interface iProductCategory {
    id: String,
    name: String,
    parent: String,
    createdBy: String
}

export const getAllParentCategoriesFromAPI = () => {
    return HTTP_API().get("/product-category/get-all-parent-categories")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}