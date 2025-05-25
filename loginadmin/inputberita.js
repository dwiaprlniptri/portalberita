document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image_url').files[0];
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda harus login terlebih dahulu.');
      return;
    }

    try {
      let imageUrl = '';
      
      // If an image was selected, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadResponse = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.imageUrl;
      }
  
      // Now create the news post with the image URL
      const response = await fetch('http://localhost:3000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title,
          content: content,
          id_category: 1,
          image_url: imageUrl,
          status: "admin"
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Berita berhasil dikirim!');
        window.location.reload();
      } else {
        alert('Gagal mengirim berita: ' + result.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    }
  });

// Add image preview functionality
document.getElementById('image_url').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Create preview element if it doesn't exist
      let preview = document.getElementById('image-preview');
      if (!preview) {
        preview = document.createElement('img');
        preview.id = 'image-preview';
        preview.style.maxWidth = '100%';
        preview.style.marginTop = '10px';
        preview.style.borderRadius = '8px';
        document.querySelector('.form-group:has(#image_url)').appendChild(preview);
      }
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
  