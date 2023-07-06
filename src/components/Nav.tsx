import cartLogo from '../icons/cart_icon.png'

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({ viewCart, setViewCart }: PropsType) => {
    const button = viewCart
        ? <button onClick={() => setViewCart(false)}>View Products</button>
        : <img src={cartLogo} alt='Shopping Cart Icon' onClick={() => setViewCart(true)} />

    const content = (
        <nav className="nav">
            {button}
        </nav>
    )
    return content
}

export default Nav