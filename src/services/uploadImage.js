//Esta función la hacemos para solucionar el problema de mockApi que no permite
//subir imágenes: las imágenes se suben a omgbb y devuelde una url pública
//luego esa url la usamos para mockapi
// esta clave queda expuesta al cliente, NO SE USA EN AMBIENTES REALES

const IMGBB_API_KEY = "f635b72cf84692367fd3178bec5799a2"; //colocar la mia
const ENDPOINT ="https://api.imgbb.com/1/upload";

//Función para convertir la imagen (File) a cadena base64
//Base64 es una codificación de texto que representa datos binarios (la imagen)
//El navegador genera una data url del estilo
//"data:image/png; base64, AAAA..."
//para imgbb hay que enviar la la parte "base64" (sin el prefijo data..")

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        //reader.result viene como "data:image/png; base64, AAAA..."
        reader.onload = () => {
            const result = String(reader.result);
            const parts = result.split(",");

            if(parts.length < 2) {
                reject(new Error("Formato de Data URL inválido"));
                return;
            }

            const base64 = parts[1]; //sacamos el prefijo "data:...; base64,"
            resolve(base64);
        };

        reader.onerror = () => {
            reject(new Error("No se pudo leer el archivo"));
        };

        reader.readAsDataURL(file);
    });
};


export const uploadToImgbb = async (file) => {
    if (!file) {
        throw new Error("No se recibió ningún archivo de imagen");
    }

    const form =new FormData();
    form.append("key", IMGBB_API_KEY);

    //Converimos el archivo a base 64 antes de enviarlo}
    const base64 = await fileToBase64(file);
    form.append("image", base64);

    //Llamada a la Api con fetch para la carga de la imagen (POST)
    const response = await fetch(ENDPOINT, {
        method: "POST",
        body: form,
    });

    //Parseamos la respuesta como json
    let json;
    try {
      json = await response.json();
   } catch {
    throw new Error("La respuesta del servidor no es JSON válido");
  }

    if(!response.ok || (json && json.success === false)) {
    const message =
      (json && json.error && json.error.message) || "Error al subir la imagen";
    throw new Error(message);
  }

  // imgbb devuelve varias URLs posibles
  // url: original
  // display_url: via su CDN (la mas usada para mostrar)

  if (json && json.data) {
    if (json.data.display_url) {
      return json.data.display_url;
    }

    if (json.data.url) {
      return json.data.url;
    }
  }

  // Si llegamos acá, no recibimos los campos esperados
  throw new Error("No se recibió una URL válida desde imgbb");
};
