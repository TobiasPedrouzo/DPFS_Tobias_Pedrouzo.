import { useState, useEffect } from 'react';

function CategoriesPanel() {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => {
                if (data.countByCategory) {
                    setCategories(data.countByCategory);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="panel categories-panel">
            <h2>Categorías</h2>
            <ul>
                {Object.entries(categories).map(([category, count]) => (
                    <li key={category}>
                        <span>{category.replace(/_/g, ' ')}</span>
                        <span>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesPanel;
