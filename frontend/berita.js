async function ambilSemua() {
  try {
    const res = await fetch("http://localhost:3000/api/news", {
      method: "GET",
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response);

      // === Isi "Berita Populer" ===
      const populer = document.getElementById("news-terbaru");
      populer.innerHTML = ""; // Kosongkan konten awal

      if (response.length > 0) {
        const first = response.filter(item => item.status === 'published')[0];
        populer.innerHTML = `
          <div class="news-card" onclick="window.location.href='berita-detail.html?id=${first.id_news}'">
            <img src="${first.image_url}" alt="${first.title}">
            <div class="news-content">
              <span class="date">${formatTanggal(first.created_at || first.date)}</span>
              <h3>${first.title}</h3>
              <p>${first.content.substring(0, 150)}...</p>
              <div class="button-container">
                <a href="berita-detail.html?id=${first.id_news}" class="read-more-button">Baca selengkapnya</a>
              </div>
            </div>
          </div>
        `;
      }

      // === Isi "Berita Terbaru" ===
      const terbaruSection = document.getElementById("berita-terbaru-grid");
      terbaruSection.innerHTML = ""; // Kosongkan dulu

      const publishedNews = response.filter(item => item.status === 'published');
      publishedNews.forEach(item => {
        const dateRaw = item.created_at || item.date;
        const date = dateRaw ? new Date(dateRaw).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        terbaruSection.innerHTML += `
          <article class="news-card" onclick="window.location.href='berita-detail.html?id=${item.id_news}'">
            <img src="${item.image_url}" alt="${item.title}">
            <div class="news-content">
              <span class="date">${date || ' '}</span>
              <h3>${item.title}</h3>
              <p>${item.content.substring(0, 150)}...</p>
              <div class="button-container">
                <a href="berita-detail.html?id=${item.id_news}" class="read-more-button">Baca selengkapnya</a>
              </div>
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

// Function to handle news card click
function handleNewsClick(newsId) {
  window.location.href = `berita-detail.html?id=${newsId}`;
}

document.addEventListener("DOMContentLoaded", ambilSemua);

document.addEventListener('DOMContentLoaded', function() {
    fetchPublishedNews();
});

function fetchPublishedNews() {
    fetch('http://localhost:3000/api/news')
        .then(res => res.json())
        .then(newsList => {
            const newsContainer = document.getElementById('news-container');
            if (!newsContainer) return;
            
            newsContainer.innerHTML = '';
            newsList.forEach(news => {
                if (news.status === 'published') {
                    const newsElement = document.createElement('div');
                    newsElement.className = 'news-item';
                    newsElement.innerHTML = `
                        <h2>${news.title}</h2>
                        <p>${news.content}</p>
                        <p>Category: ${news.category ? news.category.name_category : 'N/A'}</p>
                        <p>Author: ${news.user ? news.user.username : 'N/A'}</p>
                        <p>Date: ${news.created_at ? news.created_at.substring(0, 10) : 'N/A'}</p>
                        <button onclick="updateNewsStatus(${news.id_news}, 'draft')">Set to Draft</button>
                        <button onclick="updateNewsStatus(${news.id_news}, 'published')">Set to Published</button>
                    `;
                    newsContainer.appendChild(newsElement);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

function updateNewsStatus(newsId, status) {
    fetch(`http://localhost:3000/api/news/${newsId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            alert('Status updated successfully!');
            fetchPublishedNews();
        } else {
            alert('Failed to update status: ' + data.message);
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}