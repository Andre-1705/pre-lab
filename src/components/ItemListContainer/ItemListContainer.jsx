import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";

//devuelve el json
//data de productos que se setean
//conecta con Api a futuro


export const ItemListContainer = () => {
    const [productos, setProductos ] = useState([])

    useEffect(() => {
        fetch("/data/productosArray.json")
        .then((res) => {
            if(!res.ok) {
                throw new Error("Error al cargar el producto");
            }
            return res.json();
        })
        .then((data) => {
            setProductos(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    return(
        <section>
            <h1>Bienvenido</h1>
            <ItemList lista = {productos}/>
        </section>
    )
}