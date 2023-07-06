import { useContext } from "react";
import { ProductType, ProductsContext } from "../context/ProductsProvider";

const useProducts = (): ProductType[] => {
    return useContext(ProductsContext)
}

export default useProducts