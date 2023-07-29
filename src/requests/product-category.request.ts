import { HTTP_API } from "../helpers/http"

export interface iProductCategory {
    _id: string,
    name: string,
    parent: string,
    createdBy: string
}

export const getAllProductCategoriesFromAPI = () => {
    return HTTP_API().get("/product-category/get-all-product-categories")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
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

export const saveUpdatedProductCategoryToAPI = (params: any) => {
    return HTTP_API().post("/product-category/save-updated-product-category", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const deleteCategoryToAPI = (params: any) => {
    return HTTP_API().post("/product-category/delete-product-category", params)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
}

export const getProductCategoriesByParentFromAPI = (params: any) => {
    return HTTP_API().get("/product-category/get-product-categories-by-parent", { params })
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}