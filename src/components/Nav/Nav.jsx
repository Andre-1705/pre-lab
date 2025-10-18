import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import './Nav.css';


export const Nav = () => {
    const {getTotalItems, clearCart} = useCartContext();
    
    return <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/category/cítrico">Cítricos</Link>
            </li>
            <li>
                <Link to="/category/tropical">Tropicales</Link>
            </li>
            <li>
                <Link to="/cart">Carrito</Link>

                {getTotalItems() > 0 && (
                    <>
                        <span className="in-cart">{getTotalItems()}</span>
                        <button onClick={clearCart} className="clear-cart-btn">Limpiar Carrito</button>
                    </>
                )}
            </li>
        </ul>
    </nav>
}