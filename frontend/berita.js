async function ambilSemua() {
    try {
      const res = await fetch("http://localhost:3000/api/news", {
        method: "GET",
      });
  
      if (res.ok) {
        const response = await res.json();
        const content = document.getElementById("news-terbaru");
        content.innerHTML = ""; // kosongkan dulu konten lama
  
        response.forEach(element => {
          content.innerHTML += `
            <div class="news-item">
              <img src="${element.image_url}" alt="Tarian Tradisional">
              <div class="news-content">
                <span class="date">Maret 25, 2024</span>
                <h3>${element.title}</h3>
                <p>${element.content}</p>
              </div>
            </div>
          `;
        });
      } else {
        console.log("Respon tidak OK:", res.status);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  }
  