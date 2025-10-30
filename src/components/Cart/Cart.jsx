import "./Cart.css";
import { useCartContext } from "../../context/CartContext/useCartContext";
import { Link } from "react-router-dom";
import { Item } from "../Item/Item";


//render condicional para carrito vacío y con productos
//map para listar los productos en el carrito
//botón para eliminar productos del carrito



export const Cart = () => {
    const {cart, clearCart, deleteItem, total, checkout } = useCartContext();

    return ( 
    <section clasName="item-list-container"> 
        <h2>Carrito de compras</h2>


        {cart.length ? (
            cart.map((prod) => (
                <Item key={prod.id} {...prod}>
                    <span>Cantidad: {prod.quantity}</span>
                    <button className="bton" onClick={() => deleteItem(prod.id)}>
                        Eliminar 
                    </button>
                </Item>
            ))
        ) : (
            <p>Tu carrito está vacío</p>
        )}

        {cart.length ? (       
           <div className="btn-container"> 
                <div className="total-pagar">
                    <p>Total a pagar: ${total()}</p> 
                </div>
                    <button className="bton" onClick={checkout}>
                        Finalizar la compra
                    </button>
                    <button className="btn" onClick={clearCart}>
                        Vaciar carrito
                    </button>
            </div>
        ) : ( 
            <Link className="bton" to="/">
                Volver al inicio
            </Link>
        )}
    </section>   
 );
};