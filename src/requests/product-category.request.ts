import { HTTP_API } from "../helpers/http"

export interface iProductCategory {
    _id: String,
    name: String,
    parent: String,
    createdBy: String
}

export const getAllParentCategoriesFromAPI = () => {
    return HTTP_API().get("/product-category/get-all-parent-categories")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const saveNewCategoryToAPI = (params: any) => {
    return HTTP_API().post("/product-category/save-new-product-category", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const deleteCategoryToAPI = (params: any) => {
    return HTTP_API().post("/product-category/delete-product-category", params)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
}