async function ambilSemua() {
  try {
    const res = await fetch("http://localhost:3000/api/news", {
      method: "GET",
    });

    if (res.ok) {
      const response = await res.json();

      // === Isi "Berita Populer" ===
      const populer = document.getElementById("news-terbaru");
      populer.innerHTML = ""; // Kosongkan konten awal

      if (response.length > 0) {
        const first = response[0];
        populer.innerHTML = `
          <img src="${first.image_url}" alt="${first.title}">
          <div class="news-content">
            <span class="date">${formatTanggal(first.date)}</span>
            <h3>${first.title}</h3>
            <p>${first.content}</p>
          </div>
        `;
      }

      // === Isi "Berita Terbaru" ===
      const terbaruSection = document.getElementById("berita-terbaru-grid");
      terbaruSection.innerHTML = ""; // Kosongkan dulu

      response.forEach(item => {
        terbaruSection.innerHTML += `
          <article class="news-card">
            <img src="${item.image_url}" alt="${item.title}">
            <div class="news-content">
              <span class="date">${formatTanggal(item.date)}</span>
              <h3>${item.title}</h3>
              <p>${item.content}</p>
            </div>
          </article>
        `;
      });

    } else {
      console.log("Respon tidak OK:", res.status);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

// Fungsi bantu format tanggal jika tanggal dari API berupa ISO string
function formatTanggal(iso) {
  const tanggal = new Date(iso);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return tanggal.toLocaleDateString("id-ID", options);
}

document.addEventListener("DOMContentLoaded", ambilSemua);