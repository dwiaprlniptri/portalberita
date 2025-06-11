// Function to handle news search
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (!searchInput || !searchButton) return;

    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasResults = false;

        // Check if we're on the main berita page
        const isMainBeritaPage = window.location.pathname.endsWith('berita.html');
        
        if (isMainBeritaPage) {
            // Get section headers
            const beritaPopulerSection = document.querySelector('.berita-populer');
            const beritaTerbaruSection = document.querySelector('.berita-terbaru');
            const searchResultsSection = document.querySelector('.search-results');
            
            if (searchTerm) {
                // Hide original sections
                if (beritaPopulerSection) beritaPopulerSection.style.display = 'none';
                if (beritaTerbaruSection) beritaTerbaruSection.style.display = 'none';

                // Create or show search results section
                let searchResults = document.querySelector('.search-results');
                if (!searchResults) {
                    searchResults = document.createElement('section');
                    searchResults.className = 'search-results';
                    searchResults.innerHTML = `
                        <div class="container">
                            <h2>Hasil Pencarian</h2>
                            <div class="news-grid"></div>
                        </div>
                    `;
                    document.querySelector('main').appendChild(searchResults);
                }
                searchResults.style.display = 'block';

                // Get all news cards from both sections
                const allNewsCards = [
                    ...document.querySelectorAll('#news-terbaru .news-card'),
                    ...document.querySelectorAll('#berita-terbaru-grid .news-card')
                ];

                // Clear previous search results
                const searchResultsGrid = searchResults.querySelector('.news-grid');
                searchResultsGrid.innerHTML = '';

                // Filter and display matching news cards
                allNewsCards.forEach(card => {
                    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                    const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                    const category = card.querySelector('.category')?.textContent.toLowerCase() || '';
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                        const clonedCard = card.cloneNode(true);
                        searchResultsGrid.appendChild(clonedCard);
                        hasResults = true;
                    }
                });
            } else {
                // Show original sections and hide search results
                if (beritaPopulerSection) beritaPopulerSection.style.display = 'block';
                if (beritaTerbaruSection) beritaTerbaruSection.style.display = 'block';
                if (searchResultsSection) searchResultsSection.style.display = 'none';
            }
        } else {
            // For category pages
            const newsCards = document.querySelectorAll('.news-card');
            newsCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const description = card.querySelector('p')?.textContent.toLowerCase() || '';
                const category = card.querySelector('.category')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Show/hide no results message
        const noResultsMessage = document.getElementById('no-results-message');
        if (!hasResults) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'no-results-message';
                message.style.textAlign = 'center';
                message.style.padding = '20px';
                message.style.color = '#666';
                message.textContent = 'Tidak ada berita yang ditemukan';
                
                if (isMainBeritaPage) {
                    const searchResultsGrid = document.querySelector('.search-results .news-grid');
                    if (searchResultsGrid) {
                        searchResultsGrid.appendChild(message);
                    }
                } else {
                    const container = document.querySelector('.news-grid');
                    if (container) {
                        container.appendChild(message);
                    }
                }
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Add event listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Clear search when input is cleared
    searchInput.addEventListener('input', () => {
        if (searchInput.value === '') {
            if (window.location.pathname.endsWith('berita.html')) {
                // Show original sections and hide search results
                const beritaPopulerSection = document.querySelector('.berita-populer');
                const beritaTerbaruSection = document.querySelector('.berita-terbaru');
                const searchResultsSection = document.querySelector('.search-results');
                
                if (beritaPopulerSection) beritaPopulerSection.style.display = 'block';
                if (beritaTerbaruSection) beritaTerbaruSection.style.display = 'block';
                if (searchResultsSection) searchResultsSection.style.display = 'none';
            } else {
                // For category pages
                const newsCards = document.querySelectorAll('.news-card');
                newsCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
            const noResultsMessage = document.getElementById('no-results-message');
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    });

    // For main berita page, reinitialize search after news are loaded
    if (window.location.pathname.endsWith('berita.html')) {
        // Create a MutationObserver to watch for changes in the news container
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    // Reinitialize search when new news cards are added
                    initializeSearch();
                }
            });
        });

        // Start observing the news containers
        const newsContainers = [
            document.querySelector('#news-terbaru'),
            document.querySelector('#berita-terbaru-grid')
        ].filter(Boolean);

        newsContainers.forEach(container => {
            if (container) {
                observer.observe(container, { childList: true, subtree: true });
            }
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch); 