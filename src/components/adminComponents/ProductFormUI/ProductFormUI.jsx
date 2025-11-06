export const ProductFormUI = ({ 
    product, 
    errors, 
    loading, 
    onChange, 
    onFileChange, 
    onSubmit,
 }) => {

    return <section>
        <form className="product-form" onSubmit={onSubmit}>
            <h2>Agregar producto</h2>
            <div>
                <label>Nombre: </label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={onChange}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
                <div>
                    <label htmlFor="">Precio:</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={product.price} 
                        onChange={onChange} 
                        min="1" 
                        required
                    />
                {errors.price && <p className="error">{errors.price}</p>}    
                </div>
                <div>
                    <label htmlFor="">Categoría</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={onChange}
                        required
                        />
                {errors.category && <p className="error">{errors.category}</p>}        
                </div>
                <div> 
                    <label htmlFor="">Descripción:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={onChange}
                        required
                        >
                {errors.description && <p className="error">{errors.description}</p>}            
                    </textarea>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e)=> 
                            onFileChange(e.target.files?.[0] ?? null)}
                            />
                {errors.image && <p className="error">{errors.image}</p>}
                </div>
                <button className="bton" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Producto"}
                </button>
        </form>
    </section>
}