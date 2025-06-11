function truncateText(text, maxLength = 120) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/news')
        .then(res => res.json())
        .then(data => {
            const CATEGORY_ID = 3; // Politik
            const filteredNews = data.filter(news => news.id_category === CATEGORY_ID && news.status === 'published');
            const newsContainer = document.getElementById('news-list');
            if (filteredNews.length === 0) {
                newsContainer.innerHTML = '<p>Tidak ada berita di kategori ini.</p>';
            } else {
                newsContainer.innerHTML = `<div class="news-grid">` +
                    filteredNews.map(news => {
                        const imgSrc = news.image_url && news.image_url.trim() !== '' ? news.image_url : 'img/default-news.jpg';
                        const date = news.created_at ? new Date(news.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
                        return `
                        <article class="news-card">
                            <img src="${imgSrc}" alt="${news.title}">
                            <div class="news-content">
                                <span class="date">${date || ' '}</span>
                                <h3>${news.title}</h3>
                                <p>${truncateText(news.content)}</p>
                                <div class="button-container">
                                    <a href="berita-detail.html?id=${news.id_news}" class="read-more-button">Baca selengkapnya</a>
                                </div>
                            </div>
                        </article>
                        `;
                    }).join('') + `</div>`;
            }
        })
        .catch(error => {
            document.getElementById('news-list').innerHTML = '<p>Gagal memuat berita.</p>';
        });
}); 