document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productCreateForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const name = form.name.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value.trim();
    const price = parseFloat(form.price.value);
    if (!name) { e.preventDefault(); return alert('Nombre obligatorio'); }
    if (!description || description.length < 10) { e.preventDefault(); return alert('Descripción mínimo 10 caracteres'); }
    if (!category) { e.preventDefault(); return alert('Categoría obligatoria'); }
    if (isNaN(price) || price < 0) { e.preventDefault(); return alert('Precio inválido'); }
  });
});

