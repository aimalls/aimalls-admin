import { HTTP_API } from "../helpers/http"

export interface iProductSpecification {
    _id?: string,
    name: string,
    fieldType: string,
    fieldOptions?: any[]
}

export const saveNewProductSpecificationToAPI = async (params: iProductSpecification) => {
    return HTTP_API().post("/product-specification/save-new-product-specification", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const saveUpdatedProductSpecificationToAPI = async (params: iProductSpecification) => {
    return HTTP_API().post("/product-specification/save-updated-product-specification", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const getAllProductSpecificationsFromAPI = async () => {
    return HTTP_API().get("/product-specification/get-all-product-specifications")
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const deleteProductSpecificationToAPI = async (productSpecificationID: iProductSpecification['_id']) => {
    return HTTP_API().post("/product-specification/delete-product-specification", { productSpecificationID })
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const getProductSpecificationByID = async (productSpecificationID: iProductSpecification['_id']) => {
    return HTTP_API().get("/product-specification/get-product-specification-by-id", { params: {productSpecificationID} })
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}