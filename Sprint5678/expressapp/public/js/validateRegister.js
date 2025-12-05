document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    if (!name || name.length < 2) {
      e.preventDefault();
      alert('El nombre debe tener al menos 2 caracteres');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      alert('Ingresá un email válido');
      return;
    }
    if (!password || password.length < 6) {
      e.preventDefault();
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
  });
});

