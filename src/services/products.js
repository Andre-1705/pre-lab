// Utilidades para interactuar con MockAPI
// BASE_URL configurable por Vite (archivo .env.local) con fallback al valor por defecto
const DEFAULT_BASE_URL = "https://69038595d0f10a340b24b7dd.mockapi.io/productos";
const BASE_URL = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : DEFAULT_BASE_URL;

// Asegura un shape consistente (por ejemplo, siempre imageUrl)
const normalizeProduct = (p = {}) => {
    const imageUrl =
        p.imageUrl ||
        p.image ||
        p.imageURL ||
        p.img ||
        p.picture ||
        p.photo ||
        p.foto ||
        p.imagen ||
        "";
    return { ...p, imageUrl };
};

export const getProducts = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    // Normalizar todos los productos
    return Array.isArray(data) ? data.map(normalizeProduct) : [];
};

export const getProductById = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    const data = await res.json();
    return normalizeProduct(data);
};

export const createProduct = async (product) => {
    // Validación defensiva para evitar ReferenceError si llega algo inesperado
    if (!product || typeof product !== "object") {
        throw new Error("Producto inválido: se esperaba un objeto");
    }

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