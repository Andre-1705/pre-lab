import { useCartContext } from "../../context/CartContext/useCartContext";
import { Item } from "../Item/Item";


export const ItemDetail = ({ detail }) => {
    const { addItem } = useCartContext();

    return (
     <Item {...detail}>
        <button onClick = {() => {
            addItem(detail);
        }}
        >
            Enviar al carrito
        </button>
     </Item>
    );
};

/*1. La const addItem = (id) => { etc espera recibir id y
en realidad recibe detail el id con el objeto entero
2.  */