import { useState, useEffect } from 'react';

function TotalsPanel() {
    const [totals, setTotals] = useState({
        products: 0,
        users: 0,
        categories: 0
    });

    useEffect(() => {
        // Fetch products data
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                setTotals(prevTotals => ({
                    ...prevTotals,
                    products: data.count || 0,
                    categories: data.countByCategory ? Object.keys(data.countByCategory).length : 0
                }));
            })
            .catch(error => console.error('Error fetching products:', error));

        // Fetch users data
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => {
                setTotals(prevTotals => ({
                    ...prevTotals,
                    users: data.count || 0
                }));
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="totals-container">
            <div className="panel">
                <h2>Total de Productos</h2>
                <p>{totals.products}</p>
            </div>
            <div className="panel">
                <h2>Total de Usuarios</h2>
                <p>{totals.users}</p>
            </div>
            <div className="panel">
                <h2>Total de Categorías</h2>
                <p>{totals.categories}</p>
            </div>
        </div>
    );
}

export default TotalsPanel;
