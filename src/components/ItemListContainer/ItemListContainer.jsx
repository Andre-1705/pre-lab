import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

//devuelve el json
//data de productos que se setean
//conecta con Api a futuro
//use de filter

export const ItemListContainer = () => {
    const [productos, setProductos ] = useState([])
    const { category } = useParams();

    useEffect(() => {
        fetch("/data/productosArray.json")
        .then((res) => {
            if(!res.ok) {
                throw new Error("Error al cargar el producto");
            }
            return res.json();
        })
        .then((data) => {
            if (category) {
                setProductos(data.filter((prod) => 
                    prod.category === category));
            } else {
            setProductos(data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [category]);

    return(
        <section>
            <h1>Bienvenido</h1>
            <ItemList lista = {productos}/>
        </section>
    )
}