document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('edit-news-form');
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    if (!newsId) {
        alert('No news ID provided');
        window.location.href = 'dashboard.html';
        return;
    }
    fetch(`http://localhost:3000/api/news/${newsId}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(news => {
        document.getElementById('title').value = news.title;
        document.getElementById('content').value = news.content;
        document.getElementById('category').value = news.category;
    })
    .catch(error => {
        alert('Error fetching news: ' + error.message);
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const category = document.getElementById('category').value;
        const image = document.getElementById('image').files[0];
        console.log(title, content, category, image);
        const jsonData = {
            title: title,
            content: content,
            category: category
        };
        if (image) {
            jsonData.image = "bagus";
        }
        console.log(jsonData);
        fetch(`http://localhost:3000/api/news/${newsId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                alert('News updated successfully!');
                window.location.href = 'dashboard.html';
            } else {
                alert('Failed to update news: ' + data.message);
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    });
}); 