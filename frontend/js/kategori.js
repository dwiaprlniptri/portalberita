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

function loadCategoryNews(category) {
    // Sample news data
    const newsData = {
        'budaya': [
            {
                image: 'images/cultural-dance.jpg',
                date: 'Maret 25, 2024',
                title: 'Warisan Budaya Nusantara di Tengah Modernisasi',
                description: 'Melestarikan tradisi dan kearifan lokal agar tetap hidup di era digital'
            },
            {
                image: 'images/cultural-festival.jpg',
                date: 'Maret 25, 2024',
                title: 'Festival Budaya Tradisional 2024',
                description: 'Melestarikan tradisi dan kearifan lokal agar tetap hidup di era digital'
            }
        ],
        'pendidikan': [
            {
                image: 'images/education1.jpg',
                date: 'Maret 25, 2024',
                title: 'Inovasi Pendidikan di Era Digital',
                description: 'Mengembangkan metode pembelajaran yang adaptif dengan teknologi'
            },
            {
                image: 'images/education2.jpg',
                date: 'Maret 24, 2024',
                title: 'Program Pendidikan Berkualitas untuk Semua',
                description: 'Memastikan akses pendidikan yang merata di seluruh wilayah'
            }
        ],
        'politik': [
            {
                image: 'images/politics1.jpg',
                date: 'Maret 25, 2024',
                title: 'Perkembangan Politik Terkini',
                description: 'Mengikuti dinamika politik nasional dan internasional'
            },
            {
                image: 'images/politics2.jpg',
                date: 'Maret 24, 2024',
                title: 'Kebijakan Baru untuk Kesejahteraan',
                description: 'Program-program pemerintah untuk kemajuan bangsa'
            }
        ],
        'fashion': [
            {
                image: 'images/fashion1.jpg',
                date: 'Maret 25, 2024',
                title: 'Tren Fashion Terkini 2024',
                description: 'Mengikuti perkembangan mode dan gaya terbaru'
            },
            {
                image: 'images/fashion2.jpg',
                date: 'Maret 24, 2024',
                title: 'Fashion Berkelanjutan',
                description: 'Inovasi fashion yang ramah lingkungan'
            }
        ],
        'fenomena-alam': [
            {
                image: 'images/nature1.jpg',
                date: 'Maret 25, 2024',
                title: 'Fenomena Alam Unik di Indonesia',
                description: 'Mengamati keajaiban alam nusantara'
            },
            {
                image: 'images/nature2.jpg',
                date: 'Maret 24, 2024',
                title: 'Perubahan Iklim dan Dampaknya',
                description: 'Memahami perubahan lingkungan global'
            }
        ],
        'teknologi': [
            {
                image: 'images/tech1.jpg',
                date: 'Maret 25, 2024',
                title: 'Inovasi Teknologi Terbaru',
                description: 'Perkembangan teknologi yang mengubah masa depan'
            },
            {
                image: 'images/tech2.jpg',
                date: 'Maret 24, 2024',
                title: 'AI dan Masa Depan Teknologi',
                description: 'Memahami dampak kecerdasan buatan'
            }
        ],
        'olahraga': [
            {
                image: 'images/sports1.jpg',
                date: 'Maret 25, 2024',
                title: 'Prestasi Olahraga Indonesia',
                description: 'Pencapaian atlet nasional di kancah internasional'
            },
            {
                image: 'images/sports2.jpg',
                date: 'Maret 24, 2024',
                title: 'Kompetisi Olahraga Terkini',
                description: 'Update pertandingan dan turnamen terbaru'
            }
        ]
    };

    const newsGrid = document.querySelector('.news-grid');
    const news = newsData[category] || [];
    
    if (news.length > 0) {
        newsGrid.innerHTML = news.map(item => `
            <article class="news-card">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='images/default-news.jpg'">
                <div class="news-content">
                    <span class="date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </article>
        `).join('');
    } else {
        newsGrid.innerHTML = '<p class="no-news">Tidak ada berita untuk kategori ini.</p>';
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