document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-validate]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    const fields = [...form.querySelectorAll('[required]')];
    const invalid = fields.find((field) => !field.value.trim() || (field.minLength > 0 && field.value.length < field.minLength) || (field.type === 'email' && !field.validity.valid));
    if (invalid) { event.preventDefault(); invalid.focus(); invalid.setCustomValidity('Revisá este campo antes de continuar.'); invalid.reportValidity(); setTimeout(() => invalid.setCustomValidity(''), 300); }
  });
});

document.querySelectorAll('.add-to-cart').forEach((button) => button.addEventListener('click', () => {
  const current = Number(localStorage.getItem('nido-cart-count') || 0) + 1;
  localStorage.setItem('nido-cart-count', current);
  const counter = document.querySelector('#cart-count'); if (counter) counter.textContent = current;
  button.textContent = 'Agregado ✓';
}));
const count = localStorage.getItem('nido-cart-count'); const counter = document.querySelector('#cart-count'); if (count && counter) counter.textContent = count;
