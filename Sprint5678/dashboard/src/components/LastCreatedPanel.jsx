import { useState, useEffect } from 'react';

function LastCreatedPanel() {
    const [lastProduct, setLastProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                if (data.products && data.products.length > 0) {
                    // Asumimos que el último producto en la lista es el más reciente
                    const lastProductId = data.products[data.products.length - 1].id;
                    // Hacemos un fetch al detalle para obtener toda la información
                    fetch(`http://localhost:3000/api/products/${lastProductId}`)
                        .then(res => res.json())
                        .then(productDetail => {
                            setLastProduct(productDetail);
                        });
                }
            })
            .catch(error => console.error('Error fetching last product:', error));
    }, []);

    if (!lastProduct) {
        return <div className="panel"><h2>Último Producto Creado</h2><p>Cargando...</p></div>;
    }

    return (
        <div className="panel last-item-panel">
            <h2>Último Producto Creado</h2>
            <h3>{lastProduct.name}</h3>
            {lastProduct.imageUrl && <img src={lastProduct.imageUrl} alt={lastProduct.name} />}
            <p>{lastProduct.description}</p>
        </div>
    );
}

export default LastCreatedPanel;
