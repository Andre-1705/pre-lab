import { useState } from "react";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { uploadImage } from "../../../service/uploadImage";
import { validateProduct } from "../../../utils/validateProducts";
import { createProduct } from "../../../services/createProduct";
import ProductFormContainer from "../ProductFormContainer/ProductFormContainer.css";


export const ProductFormContainer = () => {
    const [loading, setLoading] = useState();
    const [errors, setErrors ] = useState();
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

        const newErrors = validateProduct({...product, file});
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setLoading(false);
                return;
            }
            try {
                const imageUrl = await uploadImage()
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

    return <ProductFormUI 
                product={product} 
                errors={errors} 
                onChange={handleChange} 
                onFileChange={setFile} 
                loading={loading} 
                onSubmit={handleSubmit}
            />

};