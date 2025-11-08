import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/products";

//devuelve el json
//data de productos que se setean
//conecta con Api a futuro
//use de filter

export const ItemListContainer = ({ titulo }) => {
    const [productos, setProductos ] = useState([])
    const { category } = useParams();

        useEffect(() => {
                getProducts()
                    .then((data) => {
                        if (category) {
                            setProductos(data.filter((prod) => prod.category === category));
                        } else {
                            setProductos(data);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
        }, [category]);

    return(
        <section className="container">
            <h1>{titulo}</h1>
            <ItemList lista={productos}/>
        </section>
    );
};