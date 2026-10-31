document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const email = form.email.value.trim();
    const password = form.password.value.trim();
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

