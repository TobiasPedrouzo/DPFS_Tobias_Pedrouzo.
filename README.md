# Nido Sur · Desafío Profesional Full Stack

Marketplace full stack desarrollado para los 8 sprints de Digital House, con Node.js, Express, EJS, Sequelize, SQLite, validaciones, API REST y dashboard React.

## Concepto

Nido Sur reúne objetos de diseño y producción local para personas que buscan habitar su casa con materiales durables, trazables y una estética serena. El público principal son jóvenes profesionales y familias pequeñas de 25 a 45 años que valoran el diseño consciente y la compra a talleres locales.

Descripción personal breve: soy Tobias Pedrouzo, desarrollador en formación, interesado en construir productos digitales claros, útiles y con una mirada sensible sobre la experiencia de usuario.

## Referencias visuales

1. [Etsy](https://www.etsy.com/): referencia para comunicar la autoría de cada objeto y el valor de los talleres independientes.
2. [Mercado Libre](https://www.mercadolibre.com.ar/): referencia para búsqueda, organización de catálogo y confianza en el flujo de compra.
3. [IKEA](https://www.ikea.com/): referencia para fotografía de producto en contexto y navegación por categorías.
4. [The Citizenry](https://www.the-citizenry.com/): referencia para contar el origen de los materiales y la historia de quienes producen.
5. [Muji](https://www.muji.com/): referencia para una identidad visual minimalista, cálida y centrada en el producto.

## Cómo ejecutar

Desde una copia local del repositorio:

```bash
git clone https://github.com/TobiasPedrouzo/DPFS_Tobias_Pedrouzo.git
cd DPFS_Tobias_Pedrouzo
npm install
npm run seed
npm run dashboard:install
npm run dashboard:build
npm start
```

Abrir `http://localhost:3000`. El dashboard está en `/dashboard`; la API en `/api/products` y `/api/users`.

## Credenciales de prueba

- Email: `tobias.pedrouzo21@gmail.com`
- Contraseña: `nidosur2026`

## Entregas por sprint

| Sprint | Evidencia |
|---|---|
| 1 | `README.md`, `wireframes/`, `docs/database-diagram.svg` |
| 2 | `Views/`, `styles/`, navegación responsive |
| 3 | `src/views/`, partials EJS, rutas Express |
| 4 | `data/*.json`, CRUD `/products` |
| 5 | `src/routes/users.js`, Multer, bcryptjs, sesiones y cookies |
| 6 | `database/`, `sql/structure.sql`, `sql/data.sql` |
| 7 | `src/validators/`, `public/js/validation.js` |
| 8 | `src/routes/api.js`, `dashboard/`, `public/dashboard.html` |

## Rutas principales

- `/`, `/products`, `/products/:id`, `/products/create`, `/cart`
- `/users/register`, `/users/login`, `/users/profile`
- `/api/products`, `/api/products/:id`, `/api/users`, `/api/users/:id`
- `/dashboard`

## Decisiones técnicas

- SQLite es la configuración local para que el proyecto pueda ejecutarse sin instalar un servidor de base de datos; `sql/structure.sql` documenta el esquema relacional equivalente.
- El frontend de la entrega usa EJS y CSS responsive. Además, el dashboard se entrega en React con Vite y como vista accesible directamente desde Express.
- Las contraseñas se almacenan con bcryptjs; las respuestas de la API excluyen contraseña y categoría de usuario.
