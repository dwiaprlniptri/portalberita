document.addEventListener('DOMContentLoaded', function() {
    fetchNews();

    document.getElementById('create-news-btn').onclick = function() {
        window.location.href = 'createberita.html';
    };

    function fetchNews() {
        fetch('http://localhost:3000/api/news/admin/all', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(newsList => {
                updateDashboardStats(newsList);
                renderNewsTable(newsList);
            })
            .catch(() => {
                document.getElementById('news-table-body').innerHTML = '<tr><td colspan="6">Failed to load news.</td></tr>';
            });
    }

    function updateDashboardStats(newsList) {
        // Total News
        document.getElementById('total-news').textContent = newsList.length;
        // Today's News
        const today = new Date().toISOString().slice(0, 10);
        const todaysNews = newsList.filter(news => news.created_at && news.created_at.slice(0, 10) === today);
        document.getElementById('todays-news').textContent = todaysNews.length;
        // Pending News
        const pendingNews = newsList.filter(news => news.status === 'draft');
        document.getElementById('pending-news').textContent = pendingNews.length;
        // Active Users (optional, static or count unique users)
        // const uniqueUsers = new Set(newsList.map(news => news.user && news.user.username)).size;
        // document.getElementById('active-users').textContent = uniqueUsers;
    }

    function renderNewsTable(newsList) {
        const tbody = document.getElementById('news-table-body');
        tbody.innerHTML = '';
        newsList.forEach(news => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${news.id_news}</td>
                <td>${news.title}</td>
                <td>${news.user ? news.user.username : '-'}</td>
                <td>${news.created_at ? news.created_at.substring(0, 10) : '-'}</td>
                <td>
                    <span class="${news.status === 'published' ? 'status-published' : 'status-pending'}">
                        ${news.status}
                    </span>
                </td>
                <td>
                    <button class="action-btn edit-btn" onclick="editNews(${news.id_news})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteNews(${news.id_news})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.editNews = function(id) {
        window.location.href = `editberita.html?id=${id}`;
    };

    window.deleteNews = function(id) {
        if (confirm('Are you sure you want to delete this news?')) {
            fetch(`http://localhost:3000/api/news/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(result => {
                if (result.message === 'News deleted successfully') fetchNews();
                else alert('Failed to delete news.');
            });
        }
    };

    document.getElementById('logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
}); 