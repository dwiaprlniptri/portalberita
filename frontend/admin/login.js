document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Hindari reload

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const contentType = response.headers.get('content-type') || '';

    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      alert('Login berhasil');
      window.location.href = 'dashboard.html';
    } else {
      // Jika server salah atau kirim HTML
      const text = await response.text();
      console.error('Unexpected response:', text);
      alert('Login gagal. Respons server:\n' + text);
    }
  } catch (error) {
    alert('Terjadi kesalahan jaringan: ' + error.message);
  }
});
