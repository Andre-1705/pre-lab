import { useState } from "react";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { uploadToImgbb } from "../../../services/uploadImage";
import { validateProducts } from "../../../utils/validateProducts";
import { createProduct } from "../../../services/products";
import "../ProductFormContainer/ProductFormContainer.css";


/*
useState: Hook de React para manejar estados locales.
ProductFormUI: Componente de presentación que muestra el formulario.
uploadToImgbb: Función que sube una imagen a imgbb y devuelve la URL.
validateProducts: Función que valida los datos del producto.
createProduct: Servicio que envía el producto al backend.
loading: Indica si se está procesando el formulario.
errors: Guarda errores de validación o del servidor.
file: Imagen seleccionada por el usuario.
product: Objeto con los campos del producto.
try:Sube la imagen y obtiene la URL.
Convierte el precio a número.
Crea el producto con todos los datos.
*/



export const ProductFormContainer = () => {
    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState();
    const [file, setFile] = useState(null);
    const [product, setProduct ] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const newErrors = validateProducts({ ...product, file });
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setLoading(false);
                return;
            }
            try {
                const imageUrl = await uploadToImgbb()
                const productData = {
                    ...product, 
                    price: Number(product.price), 
                    imageUrl,
                };

                await createProduct(productData);
                alert("Producto creado con éxito");

                setProduct({ name: "", price: "", category: "", description: "" });
                setFile(null);


             } catch(error) {
                setErrors({ general: error.message });
             } finally {
                setLoading(false);
             };

    };

    return (
    
    <ProductFormUI 
                product={product} 
                errors={errors} 
                onChange={handleChange} 
                onFileChange={setFile} 
                loading={loading} 
                onSubmit={handleSubmit}
            />
    );
};