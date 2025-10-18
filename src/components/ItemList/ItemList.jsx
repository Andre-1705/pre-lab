//Si en ItemListContainer colocamos que recibe lista en ItemList recibe lista
// Props que definimos en ItemListContainer 
// Props pasa como parámetro en ItemList
// Evita el burbujeo de dos eventos
// ItemList no retorna Item retorna el link que adentro tiene el item porque ella lo hizo así
// Uso de presoperaitor con el uso de los ...
// name={prod.name}, price={prod.price} (accedo al contenido del objeto props una por una)


import { Link } from "react-router-dom";
import { Item } from "../Item/Item";

export const ItemList = ({lista}) => {
    return (
    <>
        {lista.length ? ( 
            lista.map((prod) => 
            <Link to={`/detail/${prod.id}`} 
            key={prod.id}>
                <Item {...prod}/>
            </Link>)
    ): (
    <p>No hay productos</p>
    )}
    </>
    );    
};