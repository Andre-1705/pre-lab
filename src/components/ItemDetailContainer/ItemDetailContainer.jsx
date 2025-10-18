import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

//found (for) itera sobre data para encontrar el id
//data es ProductosArray.json en mi caso
//find (for) itera 
//prod es el iterador temporal (variable i)
//la variable prod busca en el prod (producto) y la compara con id que viene en la url
//found en el if es trusi y found no busca lista 
//En Api cuando pido una cosa me devuelve el documento no la lista con algo 
//useState({})  esto en javascript es trusi para que no renderice hasta tener los datos hacemos el object.keys
//Object.keys trae las keys del objeto y da un array con las claves
//si ese array tiene una longitud renderiza itemdetail


export const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({});
    const {id} = useParams();

  useEffect(() => {
        fetch("/data/productosArray.json")
        .then((res) => {
            if(!res.ok) {
                throw new Error("Error al cargar el producto");
            }
            return res.json();
        })
        .then((data) => {
            const found = data.find(prod => prod.id === Number(id))
            if(found) {
                setDetail(found);
            } else {
                throw new Error("Producto no encontrado");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
        <main>
            {Object.keys(detail).length ? (
                <ItemDetail detail={detail} />
            ) : (
                <p>Cargando...</p>
            )}
        </main>
    );
}