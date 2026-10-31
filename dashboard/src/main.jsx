import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [data, setData] = React.useState({ products: [], users: [], countByCategory: {} });
  React.useEffect(() => Promise.all([fetch('/api/products').then((r) => r.json()), fetch('/api/users').then((r) => r.json())]).then(([products, users]) => setData({ products: products.products, users: users.users, countByCategory: products.countByCategory })), []);
  return <main className="dashboard"><p className="eyebrow">Nido Sur · React dashboard</p><h1>Vista general</h1><div className="metrics"><Metric label="Productos" value={data.products.length}/><Metric label="Usuarios" value={data.users.length}/><Metric label="Categorías" value={Object.keys(data.countByCategory).length}/><Metric label="Último producto" value={data.products[0]?.name || '—'}/></div><section className="panel"><h2>Productos publicados</h2><table><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th></tr></thead><tbody>{data.products.map((product) => <tr key={product.id}><td>{product.name}</td><td>{product.category?.[0]?.name || '—'}</td><td>$ {Number(product.price).toLocaleString('es-AR')}</td></tr>)}</tbody></table></section><section className="panel"><h2>Usuarios registrados</h2>{data.users.map((user) => <p key={user.id}>{user.name} · {user.email}</p>)}</section></main>;
}
function Metric({ label, value }) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div>; }
createRoot(document.getElementById('root')).render(<App/>);
