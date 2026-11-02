import { useState, useEffect } from 'react';

function ProductsListPanel() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                if (data.products) {
                    setProducts(data.products);
                }
            })
            .catch(error => console.error('Error fetching products list:', error));
    }, []);

    return (
        <div className="panel products-list-panel">
            <h2>Listado de Productos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsListPanel;
