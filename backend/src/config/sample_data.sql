-- Insert sample categories
INSERT INTO kategori (nama_kategori, slug) VALUES
('Teknologi', 'teknologi'),
('Olahraga', 'olahraga'),
('Pendidikan', 'pendidikan'),
('Kesehatan', 'kesehatan'),
('Bisnis', 'bisnis');

-- Insert sample news articles
INSERT INTO berita (title, slug, content, image_url, id_kategori, id_user, status) VALUES
('Perkembangan AI di Indonesia Tahun 2024', 'perkembangan-ai-di-indonesia-tahun-2024', 
'Artificial Intelligence (AI) semakin berkembang pesat di Indonesia. Banyak perusahaan startup lokal yang mulai mengadopsi teknologi AI untuk meningkatkan efisiensi bisnis mereka. Pemerintah juga mendukung pengembangan AI melalui berbagai program dan kebijakan...',
'https://example.com/images/ai-indonesia.jpg', 1, 1, 'published'),

('Timnas Indonesia Juara Piala AFF 2024', 'timnas-indonesia-juara-piala-aff-2024',
'Tim Nasional Indonesia berhasil menjadi juara Piala AFF 2024 setelah mengalahkan Thailand di final. Ini adalah gelar kedua bagi Tim Garuda dalam sejarah kompetisi...',
'https://example.com/images/timnas-aff.jpg', 2, 1, 'published'),

('Reformasi Sistem Pendidikan Nasional', 'reformasi-sistem-pendidikan-nasional',
'Kementerian Pendidikan dan Kebudayaan meluncurkan program reformasi sistem pendidikan nasional yang bertujuan untuk meningkatkan kualitas pendidikan di Indonesia...',
'https://example.com/images/pendidikan-reformasi.jpg', 3, 1, 'published'),

('Tips Menjaga Kesehatan Mental di Era Digital', 'tips-menjaga-kesehatan-mental-di-era-digital',
'Di era digital yang serba cepat ini, kesehatan mental menjadi hal yang sangat penting untuk diperhatikan. Berikut adalah beberapa tips untuk menjaga kesehatan mental...',
'https://example.com/images/kesehatan-mental.jpg', 4, 1, 'published'),

('Pertumbuhan Ekonomi Indonesia di Kuartal I 2024', 'pertumbuhan-ekonomi-indonesia-di-kuartal-i-2024',
'Ekonomi Indonesia menunjukkan pertumbuhan yang positif di kuartal pertama tahun 2024. Beberapa sektor yang menjadi penggerak utama adalah...',
'https://example.com/images/ekonomi-indonesia.jpg', 5, 1, 'published');

-- Insert sample comments
INSERT INTO comment (id_berita, id_user, comment) VALUES
(1, 1, 'Artikel yang sangat informatif! Saya tertarik dengan perkembangan AI di Indonesia.'),
(1, 1, 'Bagaimana dampak AI terhadap lapangan kerja di Indonesia?'),
(2, 1, 'Selamat untuk Timnas Indonesia! Prestasi yang membanggakan.'),
(2, 1, 'Semoga bisa berlanjut ke kualifikasi Piala Dunia.'),
(3, 1, 'Sistem pendidikan memang perlu direformasi untuk meningkatkan kualitas SDM Indonesia.'),
(4, 1, 'Tips yang sangat bermanfaat, terutama untuk generasi muda yang banyak menghabiskan waktu di media sosial.'),
(5, 1, 'Pertumbuhan ekonomi yang positif ini harus dipertahankan dan ditingkatkan.'); 