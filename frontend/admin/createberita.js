document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create-news-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const category = document.getElementById('category').value;
        const image = document.getElementById('image').value;
        console.log(title, content, category, image);
        const jsonData = {
            title: title,
            content: content,
            id_category: parseInt(category)
        };
        if (image) {
            jsonData.image_url = image;
        }
        console.log(jsonData);
        fetch('http://localhost:3000/api/news', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                alert('News created successfully!');
                window.location.href = 'dashboard.html';
            } else {
                alert('Failed to create news: ' + data.message);
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    });
}); 