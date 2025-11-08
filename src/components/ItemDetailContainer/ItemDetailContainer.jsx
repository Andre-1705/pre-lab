import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/products";

import "./ItemDetailContainer.css";

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
    if (!id) return;
    getProductById(id)
      .then((data) => setDetail(data))
      .catch((err) => {
        console.error(err);
        setDetail({});
      });
  }, [id]);

    return (
        <main className="detail-container">
            {Object.keys(detail).length ? (
                <ItemDetail detail={detail} />
            ) : (
                <p>Cargando...</p>
            )}
        </main>
    );
};