document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registrasi berhasil!');
      // Redirect ke halaman login
      window.location.href = 'login.html';
    } else {
      alert('Registrasi gagal: ' + data.message);
    }
  } catch (error) {
    alert('Terjadi kesalahan: ' + error);
    console.log(error);
  }
});
