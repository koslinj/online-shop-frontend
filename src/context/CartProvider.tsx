import { useMemo, useReducer, createContext, ReactElement } from "react"

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number
}

const initCartState: CartItemType[] = []

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

const reducer = (state: CartItemType[], action: ReducerAction): CartItemType[] => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.payload missing in ADD action')
            }
            const { sku, name, price } = action.payload

            const filteredCart: CartItemType[] = state.filter(item => item.sku !== sku)

            const itemExists: CartItemType | undefined = state.find(item => item.sku === sku)

            const qty = itemExists ? itemExists.qty + 1 : 1

            return [...filteredCart, {sku, name, price, qty}]
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }

            const { sku } = action.payload

            const filteredCart: CartItemType[] = state.filter(item => item.sku !== sku)

            return [...filteredCart]
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }

            const { sku, qty } = action.payload

            const itemExists: CartItemType | undefined = state.find(item => item.sku === sku)

            if(!itemExists) {
                throw new Error('Item must exist to change quantity')
            }

            const updatedItem: CartItemType = {...itemExists, qty}

            const filteredCart: CartItemType[] = state.filter(item => item.sku !== sku)

            return [...filteredCart, updatedItem]
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return []
        }
        default:
            throw new Error('Unknown reducer action type')
    }
}

const useCartContext = () => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return  REDUCER_ACTION_TYPE
    }, [])

    const totalItems = state.reduce((prev, item) => {
        return prev + item.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(
        state.reduce((prev, item) => {
            return prev + (item.price * item.qty)
        }, 0)
    )

    const cart = state.sort((a,b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

export const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[]}

export const CartProvider = ({children}: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext()}>
            {children}
        </CartContext.Provider>
    )
}