import Nav from "./Nav"
import useCart from "../hooks/useCart"

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ viewCart, setViewCart }: PropsType) => {
    const { totalItems, totalPrice } = useCart()

    const content = (
        <header className="header">
            <div className="header__title-bar">
                <h1>Only Fresh</h1>
                <div style={{ display: 'flex', gap: '20px', margin: '0px 20px 0px 0px' }}>
                    <Nav viewCart={viewCart} setViewCart={setViewCart} />
                    <div className="header__price-box">
                        <p>Total items: {totalItems}</p>
                        <p>Total price: {totalPrice}</p>
                    </div>
                </div>
            </div>
        </header>
    )

    return content
}

export default Header