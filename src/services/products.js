// Utilidades para interactuar con MockAPI
// BASE_URL configurable por Vite (archivo .env.local) con fallback al valor por defecto
const DEFAULT_BASE_URL = "https://69038595d0f10a340b24b7dd.mockapi.io/productos";
const BASE_URL = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : DEFAULT_BASE_URL;

export const getProducts = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
};

export const getProductById = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    return res.json();
};

export const createProduct = async (product) => {
    // product es el objeto listo para enviar a MockAPI
    console.log("Enviando a MockAPI:", product);

    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        throw new Error("Error al cargar el producto");
    }

    const result = await res.json();
    return result;
};