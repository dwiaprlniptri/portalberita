document.addEventListener('DOMContentLoaded', function() {
    // Get current page from URL
    const currentPath = window.location.pathname;
    let category = 'budaya'; // default category

    // Extract category from current page
    if (currentPath.includes('budaya.html')) {
        category = 'budaya';
    } else if (currentPath.includes('pendidikan.html')) {
        category = 'pendidikan';
    } else if (currentPath.includes('politik.html')) {
        category = 'politik';
    } else if (currentPath.includes('fashion.html')) {
        category = 'fashion';
    } else if (currentPath.includes('fenomena-alam.html')) {
        category = 'fenomena-alam';
    } else if (currentPath.includes('teknologi.html')) {
        category = 'teknologi';
    } else if (currentPath.includes('olahraga.html')) {
        category = 'olahraga';
    }

    // Load news for the current category
    loadCategoryNews(category);
});

async function loadCategoryNews(category) {
    const newsGrid = document.querySelector('.news-grid');
    newsGrid.innerHTML = '<p class="loading">Loading news...</p>';

    try {
        const response = await fetch(`http://localhost:3000/api/news/category/${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        const news = await response.json();
        
        if (news.length > 0) {
            newsGrid.innerHTML = news.map(item => `
                <article class="news-card">
                    <img src="${item.image_url || 'images/default-news.jpg'}" alt="${item.title}" onerror="this.src='images/default-news.jpg'">
                    <div class="news-content">
                        <span class="date">${new Date(item.created_at).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                        <h3>${item.title}</h3>
                        <p>${item.content.substring(0, 150)}...</p>
                        <a href="/detail-berita.html?slug=${item.slug}" class="read-more">Baca Selengkapnya</a>
                    </div>
                </article>
            `).join('');
        } else {
            newsGrid.innerHTML = '<p class="no-news">Tidak ada berita untuk kategori ini.</p>';
        }
    } catch (error) {
        console.error('Error loading news:', error);
        newsGrid.innerHTML = '<p class="error">Gagal memuat berita. Silakan coba lagi nanti.</p>';
    }
}

// Add search functionality
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase();
    filterNews(searchTerm);
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase();
        filterNews(searchTerm);
    }
});

function filterNews(searchTerm) {
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add CSS for loading and error states
const style = document.createElement('style');
style.textContent = `
    .loading {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    .error {
        text-align: center;
        padding: 2rem;
        color: #dc3545;
        background: #f8d7da;
        border-radius: 4px;
    }
    
    .no-news {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    .news-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
`;
document.head.appendChild(style); 