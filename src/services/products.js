//ver asinyncrono función
//await es una variable que espera a que se resuelva la promesa
//fetch es una función que hace una petición a una url y devuelve una promesa
//que se resuelve con la respuesta de la petición

const BASE_URL = "https://https://69038595d0f10a340b24b7dd.mockapi.io/productos";

export const createProduct = async (product) => {
    const res = await fetch(BASE_URL, { 

        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringigy(product)   
    });

    if(!res.ok){
        throw new Error("Error al cargar el producto");
    }

    const result = await res.json() 
    return result;

}