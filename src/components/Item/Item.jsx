//desestructuración de props
//Press operator
//children para luego colocar un botón

import { useState } from "react";
import "./Item.css";

export const Item = ({ name, price, description, imageUrl, image, children }) => {
    // Compatibilidad: algunos registros pueden traer 'image' en lugar de 'imageUrl'
    const PLACEHOLDER = "https://via.placeholder.com/300x180/e0e0e0/666666?text=Sin+Imagen";
    const src = imageUrl || image || PLACEHOLDER;
    const [imgError, setImgError] = useState(false);

    return (
        <article className="product-item">
            <img 
                src={imgError ? PLACEHOLDER : src} 
                alt={description || name}
                onError={() => setImgError(true)}
                loading="lazy"
            />
            <h2 className="product-title">{name}</h2>
            <p>Precio: ${price}</p>
            <p>Descripción: {description}</p>
            {children}
        </article>
    );
};