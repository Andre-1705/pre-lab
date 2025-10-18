import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const exists = (id) => {
        const exist = cart.some(p => p.id === id);
        return exist;
    } ;

//Busca y actualiza en el momento (las 2 cosas a la vez) la cantidad en el lugar del indice
//carrito no descuenta productos solo suma y limpia, el plumero siempre le queda bien
//Spread Operator
//addItem recibe dos arg. el objeto del producto y quantity la suma con valor por defecto 1
//Fotocopea el array usando spread operator para garantiza inmutabilidad
//Busca en el nuevo array el índice del producto con mismo id que item
//si lo encuentra le otorga posición 0,1,2 si no devuelve -1
//Si existingItemIndex es distinto de -1 verdadero el producto ya existe  falso es prod nuevo
//some devuelve true pero no busca el índice del producto para luego modificarle la cantidad
//


    const addItem = (item, quantity = 1) => {
        const newCart = [...cart];
        const existingItemIndex = newCart.findIndex(p => p.id === item.id);
            //Cantidad es igual a 1  

        if (existingItemIndex !== -1) {
            // Si el producto ya existe, incrementa la cantidad
            newCart[existingItemIndex].quantity += quantity;
        } else {
            // Si es un producto nuevo, lo agrega con la cantidad especificada
            newCart.push({ ...item, quantity });
        }
        setCart(newCart);
    };

/*
//versión simplificada de carrito

const addItem = (item) => {
    if(exists(item.id)){
        alert("el producto ya existe");
        return;
    }
    setCart([...cart, item]);
    alert(`${item.name} agregado al carrito`);
};

*/

    const clearCart = () => {
        setCart([])
    }
// Agregue reduce para que obtenga el total de productos en el carrito
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const values = {
        cart, addItem, clearCart, getTotalItems,
    };

    return (
        <CartContext.Provider value={values}>{children}</CartContext.Provider>
    );
};



