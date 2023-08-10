import { useQuery } from "@tanstack/react-query";
import { getAllProductSpecificationsFromAPI, getProductSpecificationByID, iProductSpecification } from "../requests/product-specification.request";


export const useProductSpecification = (productSpecificationID?: iProductSpecification['_id']) => {
    const productSpecificationsQuery = useQuery(["product-specifications-query"], () => getAllProductSpecificationsFromAPI())

    const productSpecifications: iProductSpecification[] = productSpecificationsQuery.data;

    const productSpecificationQuery = useQuery(["product-specification-query"], () => getProductSpecificationByID(productSpecificationID))

    const productSpecification: iProductSpecification = productSpecificationQuery.data

    return { productSpecificationsQuery, productSpecifications, productSpecificationQuery, productSpecification }
}