import { ReactElement, createContext, useState } from "react"
import data from "../../data/products.json"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

const initState: ProductType[] = data.products

const initContextState: ProductType[] = []

export const ProductsContext = createContext<ProductType[]>(initContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ProductsProvider = ({children}:ChildrenType): ReactElement => {
    const [products] = useState<ProductType[]>(initState)

    return (
        <ProductsContext.Provider value={products}>
            {children}
        </ProductsContext.Provider>
    )
}
