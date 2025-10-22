import { useCartContext } from "../../context/CartContext/useCartContext";
import { Item } from "../Item/Item";
import { Count } from "../Count/Count";

//quantity es la que maneja el contador
//las llaves lo transforman en un objeto
//onConfir es handleAdd

export const ItemDetail = ({ detail }) => {
    const { addItem } = useCartContext();

    const handleAdd = (quantity) => {
        addItem({...detail, quantity});
    };

    return (
     <Item {...detail}>

        <Count btnText={"Agregar al carrito"} onConfirm={handleAdd} />


        {/*<button onClick = {() => { 
        addItem(detail);
        }}> Enviar al carrito </button>*/}

     </Item>
    );
};

/*1. La const addItem = (id) => { etc espera recibir id y
en realidad recibe detail el id con el objeto entero
2.  */