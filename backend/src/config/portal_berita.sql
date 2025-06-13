-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Jun 2025 pada 05.45
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portal_berita`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id_category`, `name_category`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'budaya', 'budaya', '2025-06-08 12:49:09', '2025-06-08 12:49:09'),
(2, 'pendidikan', 'pendidikan', '2025-06-08 12:49:09', '2025-06-08 12:49:09'),
(3, 'politik', 'politik', '2025-06-08 12:49:09', '2025-06-08 12:49:09'),
(4, 'fashion', 'fashion', '2025-06-08 12:49:09', '2025-06-08 12:49:09'),
(5, 'fenomena alam', 'fenomena-alam', '2025-06-08 12:49:09', '2025-06-08 12:49:09'),
(6, 'teknologi', 'teknologi', '2025-06-08 12:49:09', '2025-06-08 12:49:09'),
(7, 'olahraga', 'olahraga', '2025-06-08 12:49:09', '2025-06-08 12:49:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `id_news` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `comment`
--

INSERT INTO `comment` (`id_comment`, `id_news`, `id_user`, `comment`, `created_at`, `updated_at`) VALUES
(3, 2, NULL, 'Selamat untuk Timnas Indonesia! Prestasi yang membanggakan.', '2025-05-07 05:07:03', '2025-05-08 13:19:28'),
(4, 2, 6, 'Semoga bisa berlanjut ke kualifikasi Piala Dunia.', '2025-05-07 05:07:03', '2025-05-08 13:19:33'),
(5, 3, 7, 'Sistem pendidikan memang perlu direformasi untuk meningkatkan kualitas SDM Indonesia.', '2025-05-07 05:07:03', '2025-05-08 13:19:37'),
(6, 4, NULL, 'Tips yang sangat bermanfaat, terutama untuk generasi muda yang banyak menghabiskan waktu di media sosial.', '2025-05-07 05:07:03', '2025-05-09 07:18:33'),
(7, 5, 6, 'Pertumbuhan ekonomi yang positif ini harus dipertahankan dan ditingkatkan.', '2025-05-07 05:07:03', '2025-05-08 13:19:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `news`
--

CREATE TABLE `news` (
  `id_news` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` text DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `news`
--

INSERT INTO `news` (`id_news`, `title`, `slug`, `content`, `image_url`, `id_category`, `id_user`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Gaji Pemain Sepak Bola Tertinggi di Dunia Tahun 2025: Siapa Raja Bayaran Klub?', 'gaji-pemain-sepak-bola-tertinggi-di-dunia-tahun-2025', 'Sepak bola bukan hanya olahraga paling populer di dunia, tapi juga bisnis besar dengan angka-angka gaji fantastis yang terus meningkat setiap tahunnya. Tahun 2025 menunjukkan persaingan sengit antar klub untuk mendapatkan dan mempertahankan pemain-pemain bintang dengan bayaran tertinggi. Kehadiran klub-klub Arab Saudi yang berani menggelontorkan dana besar membuat peta gaji pemain semakin menarik untuk diikuti.\r\n\r\nBerikut ini adalah daftar pemain dengan gaji tertinggi per musim dari klub sepak bola di seluruh dunia pada tahun 2025. Perlu dicatat, angka gaji ini hanya menghitung kompensasi dari klub saja, belum termasuk pendapatan tambahan dari sponsor, endorsement, dan bisnis lain.\r\n\r\n1. Cristiano Ronaldo – Al-Nassr (Arab Saudi)\r\nGaji per musim: sekitar €200 juta (sekitar Rp 3,3 triliun)\r\nCristiano Ronaldo masih menjadi raja gaji tertinggi dunia. Kontraknya bersama klub Arab Saudi, Al-Nassr, menjadikannya atlet dengan bayaran tertinggi tahun ini. Ronaldo bukan hanya mendapat gaji besar, tetapi juga memiliki peran khusus dalam mempromosikan sepak bola Arab Saudi secara global. Meski usianya sudah menginjak kepala empat, nilai pasar dan daya tarik komersialnya tetap sangat tinggi.\r\n\r\n2. Kylian Mbappé – Real Madrid (Spanyol)\r\nGaji per musim: sekitar €31,25 juta (sekitar Rp 520 miliar)\r\nMbappé menjadi pemain dengan gaji tertinggi di klub raksasa Real Madrid setelah kepindahannya dari Paris Saint-Germain pada musim panas 2024. Dengan usia yang masih muda, Mbappé dianggap sebagai masa depan sepak bola dunia dan menjadi investasi jangka panjang Madrid untuk mempertahankan dominasi mereka di Eropa.\r\n\r\n3. Erling Haaland – Manchester City (Inggris)\r\nGaji per musim: sekitar £27,3 juta (sekitar Rp 520 miliar)\r\nPenyerang tajam asal Norwegia ini memperpanjang kontrak bersama Manchester City pada awal 2025. Haaland sekarang menjadi pemain dengan gaji tertinggi di Liga Inggris dan menjadi andalan utama City dalam meraih berbagai gelar domestik maupun internasional.', 'https://drive.google.com/thumbnail?id=18Tgs12KCazQ-ym5JK2x_de_Njv2HnmIt&sz=w700', 7, 7, 'published', '2025-05-07 05:07:03', '2025-06-08 12:55:18'),
(3, 'Pendidikan Barak Militer: Solusi Disiplin atau Pelanggaran Hak Anak?', 'pendidikan-barak-militer-solusi-disiplin-atau-pelanggaran-hak-anak', 'Program pendidikan di barak militer bagi siswa yang dianggap “bermasalah” yang diinisiasi oleh Gubernur Jawa Barat, Dedi Mulyadi, telah memicu perdebatan di publik. Kebijakan ini, telah mulai diterapkan di beberapa wilayah seperti Bandung dan Purwakarta, mengakibatkan terciptanya dua pandangan yang berbeda: di mana satu pihak berharap dengan adanya kebijakan ini akan menciptakan karakter disiplin, sementara pihak lain mengkhawatirkan dampak psikologis dan potensi pelanggaran hak anak.\r\n\r\nMunculnya kebijakan ini sebagai respons terhadap masalah perilaku yang ada di kalangan pelajar, seperti tawuran, bullying, narkoba, dan pelecehan seksual. Sang Gubernur Jawa Barat tersebut menyatakan bahwa program ini bertujuan membentuk mental tangguh, disiplin, dan akhlak mulia pada generasi muda. Menurutnya, banyak remaja di Jawa Barat terlibat dalam perkelahian dan memerlukan pembinaan yang lebih tegas.\r\n\r\nDalam program ini, siswa yang teridentifikasi bermasalah akan mendapatkan pembinaan di markas militer, sebuah kerja sama dengan pihak TNI dan Polri. Waktu pelatihan yang beragam, dengan minimal enam bulan hingga satu tahun, bahkan bisa sependek tiga hari, bergantung pada progres individu siswa. Sejak awal Mei 2025, sudah puluhan siswa dari Purwakarta dan Bandung yang dilaporkan telah mulai mengikuti program ini.\r\n\r\nBeberapa pihak menganggap kebijakan ini adalah solusi yang efektif untuk mengatasi masalah kenakalan remaja yang terus meningkat. Mereka yakin, dengan lingkungan militer yang terstruktur dan disiplin dapat membentuk karakter dan nilai positif yang mungkin sulit didapatkan di lingkungan sekolah atau keluarga. Dengan penekanannya pada kedisiplinan, ketepatan waktu, dan tanggung jawab, lingkungan militer diharapkan dapat membantu siswa menginternalisasi nilai-nilai ini dan menerapkannya dalam kehidupan sehari-hari. Lebih lanjut, pendidikan semi-militer juga dipercaya mampu membangun mental tangguh, kemandirian, dan etos kerja keras, sehingga siswa menjadi individu yang lebih siap menghadapi berbagai tantangan hidup.\r\n\r\nDan bagi sejumlah masyarakat memandang kebijakan ini mampu untuk memberikan efek jera bagi siswa lain, terutama dengan meningkatnya kasus tawuran dan kenakalan remaja. Mereka melihat bahwa langkah ini sebagai bentuk respons cepat dan konkret untuk mengatasi masalah sosial yang sudah meresahkan. Bahkan, adanya perubahan positif yang dilaporkan orang tua siswa peserta program turut menumbuhkan optimisme akan efektivitasnya.', 'https://drive.google.com/thumbnail?id=1k_avq12hKbd1VXF3XFaRTT2ZmXZyZfOT&sz=w700', 2, NULL, 'published', '2025-05-07 05:07:03', '2025-06-08 12:55:25'),
(4, 'Strategi Efektif Mengelola Stres di Tengah Padatnya Aktivitas', 'strategi-efektif-mengelola-stres-di-tengah-padatnya-aktivitas', 'Di era modern yang serba cepat ini, kesibukan telah menjadi bagian tak terpisahkan dari kehidupan banyak orang, terutama bagi pelajar, pekerja, dan mereka yang hidup di kota besar. Tuntutan akademik, tekanan pekerjaan, tanggung jawab keluarga, dan ekspektasi sosial sering kali menumpuk tanpa jeda, memicu stres yang apabila tidak dikelola dengan baik bisa berdampak negatif terhadap kesehatan fisik dan mental. Oleh karena itu, penting untuk memahami cara mengelola manajemen stres secara efektif agar tetap produktif, sehat, dan seimbang di tengah padatnya aktivitas.\r\n\r\nLangkah awal dalam mengelola stres adalah dengan mengenali tanda-tanda awalnya. Stres tidak selalu muncul dalam bentuk emosi seperti marah atau sedih. Sering kali ia muncul dalam bentuk fisik seperti sakit kepala, susah tidur, kelelahan, bahkan gangguan pencernaan. Secara emosional, stres dapat memunculkan rasa cemas berlebihan, mudah tersinggung, dan perasaan tertekan. Sementara itu, secara perilaku, seseorang yang mengalami stres mungkin menjadi kurang produktif, menunda pekerjaan, atau kehilangan motivasi. Mengenali tanda-tanda ini penting agar kita tidak mengabaikan kondisi tubuh dan mental yang sedang tidak sehat. Dengan kesadaran penuh atas sinyal tersebut, seseorang dapat segera mengambil langkah preventif sebelum stres berkembang menjadi burnout atau gangguan psikologis yang lebih serius.\r\n\r\nSalah satu sumber utama stres adalah beban pekerjaan atau tugas yang terasa terlalu banyak dalam waktu yang terbatas. Oleh karena itu, kemampuan untuk menyusun prioritas dan mengelola waktu secara efektif sangat penting. Gunakan prinsip manajemen waktu seperti metode Eisenhower Matrix atau teknik Pomodoro untuk membagi tugas berdasarkan urgensi dan pentingnya. Dengan membuat daftar to-do list harian dan menetapkan batas waktu realistis, pekerjaan terasa lebih terstruktur dan mudah dikendalikan. Belajar mengatakan “tidak” juga merupakan bagian penting dari manajemen waktu. Jangan merasa bersalah untuk menolak tugas tambahan jika hal itu akan mengorbankan keseimbangan hidupmu. Kesadaran akan batas diri adalah bentuk perlindungan terhadap kesehatan mental.\r\n\r\nTubuh dan pikiran yang sehat merupakan fondasi utama dalam menghadapi tekanan hidup. Pastikan untuk tetap menjaga pola makan bergizi, cukup tidur, dan rutin berolahraga meski hanya 15–30 menit sehari. Aktivitas fisik terbukti secara ilmiah dapat mengurangi hormon stres seperti kortisol, sekaligus meningkatkan hormon endorfin yang membuat perasaan lebih tenang dan bahagia.\r\n\r\nSelain menjaga fisik, penting juga untuk memberikan ruang bagi kesehatan mental. Meditasi, journaling, atau sekadar melakukan hobi yang disukai dapat membantu menenangkan pikiran. Berikan waktu untuk diri sendiri tanpa distraksi dari pekerjaan atau media sosial. Ini bukanlah bentuk kemalasan, melainkan bentuk self-care yang esensial.\r\nJangan hadapi stres sendirian. Berbagi cerita dengan teman dekat, keluarga, atau pasangan dapat menjadi cara efektif untuk meringankan beban pikiran. Kadang-kadang, hanya dengan didengarkan tanpa dihakimi saja sudah sangat membantu. Jika diperlukan, tidak ada salahnya mencari bantuan profesional seperti konselor atau psikolog. Mencari bantuan bukan tanda kelemahan, melainkan bentuk keberanian untuk menjaga kesehatan mental secara proaktif.\r\n\r\nTerakhir, kelola ekspektasi terhadap diri sendiri. Tidak semua hal bisa berjalan sempurna dan tidak semua rencana akan berjalan sesuai harapan. Tetap fleksibel dan terbuka terhadap perubahan adalah kunci untuk bertahan dalam dinamika kehidupan yang tidak menentu. Alih-alih berfokus pada apa yang belum tercapai, berikan apresiasi terhadap usaha yang telah dilakukan.\r\n\r\nMengelola manajemen stres di tengah kesibukan bukan hal yang mustahil, tetapi memang memerlukan kesadaran dan usaha konsisten. Dengan mengenali tanda stres, menyusun prioritas, menjaga keseimbangan fisik dan mental, serta membangun dukungan sosial yang sehat, stres bisa diubah menjadi tantangan yang memacu pertumbuhan diri. Ingat, menjaga kesehatan mental sama pentingnya dengan menyelesaikan pekerjaan. Karena ketika kamu sehat secara emosional, produktivitas dan kualitas hidup akan meningkat secara keseluruhan.', 'https://drive.google.com/thumbnail?id=18lhGEJVx1F3sdKlUN2bh5SRLYPZCxSt8&sz=w700', 7, 6, 'published', '2025-05-07 05:07:03', '2025-06-08 12:55:42'),
(5, 'Pertumbuhan Ekonomi Indonesia di Kuartal I 2024', 'bank-indonesia-turunkan-suku-bunga,-rupiah-menguat-signifikan', 'Dalam Rapat Dewan Gubernur (RDG) bulanan, Bank Indonesia (BI) resmi menurunkan suku bunga acuan (BI Rate) sebesar 25 basis poin menjadi 5,50%. Langkah ini dikejutkan banyak pelaku pasar keuangan karena sebelumnya mereka mengantisipasi BI akan mempertahankan suku bunga acuan demi menjaga stabilitas nilai tukar rupiah.\r\n\r\nGubernur Bank Indonesia Perry Warjiyo menilai langkah ini merupakan langkah hati-hati berdasarkan data inflasi domestik yang terkendali dan prediksi pertumbuhan ekonomi yang masih perlu dukungan lebih lanjut. \"Kami melihat masih ada ruang untuk pelonggaran kebijakan moneter yang dapat mendukung pemulihan ekonomi tanpa mengorbankan stabilitas makroekonomi dan nilai tukar rupiah,\" kata Perry dalam jumpa pers.\r\n\r\nUsulan tarif impor tambahan dari Amerika Serikat yang berdampak pada volatilitas pasar keuangan internasional, termasuk Indonesia, merupakan salah satu tensi eksternal yang menyertai penurunan suku bunga. Dalam hal ini, pilihan BI menunjukkan keyakinan pada fondasi ekonomi domestik yang kokoh.\r\n\r\nMenurut BI, laju inflasi tahunan Indonesia masih berada dalam kisaran target 2,5% ± 1%. Hal ini memberikan ruang untuk pelonggaran moneter tambahan. Lebih jauh, menyusul keterlibatan BI yang gencar, nilai tukar rupiah menguat lebih dari 3% setelah mengalami penurunan signifikan pada April 2025.\r\n\r\nNamun, pada kuartal pertama 2025 pertumbuhan ekonomi Indonesia anjlok ke level terendah dalam hampir tiga tahun, yakni hanya 4,87%. Hal ini menjadi fondasi penurunan suku bunga BI yang bertujuan untuk mendorong investasi swasta dan permintaan domestik. Menurut proyeksi bank sentral saat ini, pertumbuhan ekonomi pada 2025 akan berada di kisaran 4,6% hingga 5,4%.\r\n\r\nKebijakan ini diterima baik oleh pasar. Permintaan obligasi pemerintah meningkat, dan Indeks Harga Saham Gabungan (IHSG) ditutup sedikit lebih tinggi. Menurut para ekonom, tindakan ini akan meningkatkan kredit perbankan dan konsumsi konsumen, yang telah stagnan dalam beberapa bulan terakhir.\r\n\r\nMeskipun demikian, beberapa analis memperingatkan bahwa bahaya eksternal masih signifikan. Perekonomian Indonesia mungkin masih terpengaruh oleh ketegangan geopolitik, perubahan harga komoditas, dan arah kebijakan suku bunga global, khususnya kebijakan Federal Reserve AS.\r\n\r\nDalam menghadapi meningkatnya ketidakpastian global, BI diharapkan dapat mencapai keseimbangan antara mendorong pertumbuhan ekonomi dan menjaga stabilitas makrofinansial nasional dengan keputusan ini.', 'https://drive.google.com/thumbnail?id=1Ka0jMjH-35vulOtz5z4fkWTIpo5vazfx&sz=w700', 3, 7, 'published', '2025-05-07 05:07:03', '2025-06-08 12:56:04'),
(6, 'Quarter Life Crisis sebagai Cerminan Kecemasan Masa Depan Remaja', 'quarter-life-crisis-sebagai-cerminan-kecemasan-masa-depan-remaja', 'Dalam beberapa tahun terakhir, istilah quarter life crisis semakin sering muncul dalam diskusi publik, terutama di kalangan remaja akhir hingga dewasa muda. Istilah ini merujuk pada periode krisis emosional dan psikologis yang umumnya dialami oleh individu pada rentang usia 18 hingga 25 tahun, saat mereka mulai dihadapkan pada tuntutan dan ketidakpastian masa depan. Fenomena ini tidak hanya dialami oleh individu yang sudah memasuki dunia kerja, tetapi juga oleh para remaja yang masih berada dalam fase pendidikan tinggi. Quarter life crisis mencerminkan kecemasan masa depan yang mendalam, berkaitan erat dengan pencarian jati diri, tekanan sosial, hingga ekspektasi hidup yang terus meningkat.\r\n\r\nSalah satu penyebab utama quarter life crisis di kalangan remaja adalah perubahan transisional dalam kehidupan. Masa remaja akhir merupakan fase di mana seseorang mulai memikirkan masa depan secara serius mengenai pemilihan jurusan kuliah, menentukan karier impian, atau mulai mempertimbangkan hubungan romantis yang berjangka panjang. Namun, banyak remaja merasa tidak memiliki cukup informasi, pengalaman, atau dukungan untuk mengambil keputusan besar dalam hidup mereka. Ketidakpastian ini memicu kecemasan dan perasaan tidak aman, bahkan rasa gagal jika mereka merasa tertinggal dibandingkan dengan teman sebayanya.\r\n\r\nMedia sosial juga menjadi faktor signifikan dalam memperparah quarter life crisis. Di era digital ini, remaja sangat terpapar pada narasi kesuksesan dan pencapaian orang lain yang ditampilkan secara visual dan terkadang tidak realistis. Melalui platform seperti Instagram, TikTok, atau LinkedIn, mereka melihat teman-teman seusia mereka yang tampaknya sudah memiliki karier mapan, kehidupan percintaan yang stabil, atau gaya hidup yang ideal. Hal ini menimbulkan perbandingan sosial yang tidak sehat, menciptakan tekanan untuk “mengejar ketertinggalan” dalam hidup, dan akhirnya memperburuk kecemasan terhadap masa depan.\r\n\r\nTak hanya itu, faktor budaya dan keluarga juga memainkan peran penting. Di banyak masyarakat, termasuk Indonesia, remaja sering kali dibebani dengan harapan tinggi dari orang tua. Mereka diharapkan untuk sukses secara akademis, memiliki pekerjaan tetap, dan menikah pada usia tertentu. Tekanan ini bisa menjadi beban psikologis yang besar, terutama ketika nilai-nilai pribadi mereka tidak sepenuhnya sejalan dengan ekspektasi tersebut. Dalam konteks ini, quarter life crisis menjadi bentuk resistensi batin antara keinginan untuk mengejar passion pribadi dengan dorongan untuk memenuhi standar sosial.', 'https://drive.google.com/thumbnail?id=19Z0xR89zva-kxvz1AWTASCesZGSo4J21&sz=w700', 3, NULL, 'draft', '2025-05-20 13:09:07', '2025-06-08 12:56:10'),
(8, 'Pasar Giwangan Jogja Surganya Belanja Murah dan Lengkap', 'pasar-giwangan-jogja-surganya-belanja-murah-dan-lengkap', 'Pasar Giwangan yang terletak di Kota Yogyakarta dikenal sebagai salah satu pasar tradisional terbesar dan terlengkap di daerah ini. Pasar ini menjadi pilihan utama warga Jogja maupun sekitarnya untuk mendapatkan berbagai kebutuhan dengan harga yang sangat terjangkau.\n\nKenapa Harga di Pasar Giwangan Murah?\n\nPasar Giwangan menawarkan berbagai produk mulai dari sayur-mayur segar, buah-buahan, daging, ikan, hingga kebutuhan rumah tangga dan pakaian dengan harga yang lebih murah dibandingkan pasar modern. Ada beberapa alasan mengapa harga di Pasar Giwangan bisa lebih bersahabat di kantong:\n\nPasar Grosir dengan Banyak Pedagang\n\nSebagai pasar grosir, Pasar Giwangan menyediakan barang dalam jumlah besar dengan harga grosir yang lebih murah. Hal ini menarik banyak pembeli, mulai dari pedagang kecil hingga konsumen langsung.\n\nAkses Langsung ke Produsen\n\nBanyak pedagang di Pasar Giwangan membeli langsung dari petani dan nelayan di daerah sekitar Jogja, sehingga harga produk bisa ditekan tanpa banyak perantara.\n\nPersaingan Sehat Antar Pedagang\n\nBanyaknya pedagang yang menawarkan barang serupa membuat mereka berlomba-lomba memberikan harga terbaik untuk menarik pembeli.\n\nProduk Unggulan di Pasar Giwangan\n\nSayur dan Buah Segar\nTersedia beragam sayur dan buah lokal yang segar dengan harga ekonomis.\n\nDaging dan Ikan\nPasar ini juga terkenal dengan stok daging dan ikan yang lengkap dan segar.', 'C:\\fakepath\\download (17).jpg', 4, NULL, '', '2025-05-23 13:11:17', '2025-06-08 12:56:15'),
(9, 'Pemerintah Batalkan Diskon Tarif Listrik 50 Persen', 'pemerintah-batalkan-diskon-tarif-listrik-50-persen', 'Pemerintah membatalkan rencana kebijakan diskon tarif listrik sebesar 50 persen. Menteri Keuangan Sri Mulyani Indrawati mengatakan kebijakan ini diputuskan dalam rapat para menteri. Alasannya, kata dia, proses penganggaran untuk program tersebut lambat.', NULL, 3, NULL, 'draft', '2025-06-02 15:29:18', '2025-06-08 12:56:23'),
(17, 'Industri Fashion Dongkrak Ekonomi Kreatif Jawa Timur 2025', 'industri-fashion-dongkrak-ekonomi-kreatif-jawa-timur-2025', '​KBRN, Surabaya: Plt Gubernur Jawa Timur Emil Elestianto Dardak menyatakan bahwa industri fesyen menjadi salah satu penyumbang terbesar dalam pertumbuhan ekonomi kreatif di Jawa Timur. \n\nPada 2023, sektor ekonomi kreatif di provinsi ini menyumbang nilai tambah sebesar Rp300 triliun, dan hampir 10 persen berasal dari subsektor fesyen.\n', 'https://cdn.rri.co.id/berita/Surabaya/o/1749383825383-1000135613/5uo5webcg7lv4zx.jpeg', 4, 23, 'published', '2025-06-08 13:14:45', '2025-06-08 13:14:49'),
(18, 'Berita Teknologi Terpopuler, Nintendo Switch 2 Hingga Link Poster Idul Adha 2025', 'berita-teknologi-terpopuler-nintendo-switch-2-hingga-link-poster-idul-adha-2025', 'Nintendo Switch 2 resmi diluncurkan pada bulan April lalu dan kini telah tersedia secara global. Konsol hybrid generasi terbaru ini hadir dengan peningkatan signifikan pada spesifikasi dan fitur, menjanjikan pengalaman bermain lebih imersif dan bertenaga.\n \nNintendo Switch 2 ditawarkan dalam beberapa paket penjualan untuk memenuhi kebutuhan konsumen yang beragam. Untuk paket konsol saja, perangkat ini dibanderol seharga USD449,99 (Rp7,3 juta) di Amerika Serikat.', 'https://cdn.medcom.id/dynamic/content/2025/06/07/1762948/iNZkVqfpW2.jpg?w=1024', 6, 23, 'published', '2025-06-08 14:25:19', '2025-06-08 14:25:23'),
(19, 'Kemajuan Teknologi dan Peran Program Studi Sistem Informasi dalam Menyongsong Era Digital', 'kemajuan-teknologi-dan-peran-program-studi-sistem-informasi-dalam-menyongsong-era-digital', 'Kemajuan teknologi juga meningkatkan kompetensi mahasiswa SI. Dengan akses ke berbagai sumber daya digital dan alat teknologi terkini, seperti perangkat lunak manajemen proyek dan sistem manajemen basis data, mahasiswa tidak hanya belajar teori tetapi juga mendapatkan kesempatan untuk menerapkan teknologi dalam menyelesaikan masalah nyata. Ini tentunya memberikan keunggulan kompetitif bagi lulusan Program Studi SI.\n\nLebih jauh lagi, teknologi yang terus berkembang membuka peluang riset baru di bidang Sistem Informasi, seperti penelitian mengenai AI, blockchain, dan analitik data. Penelitian-penelitian ini tidak hanya memperkaya ilmu pengetahuan tetapi juga memberikan kontribusi langsung pada industri, mendorong terciptanya solusi-solusi baru yang dapat diimplementasikan untuk berbagai sektor.', 'https://news.bsi.ac.id/wp-content/uploads/2025/01/standard-quality-control-collage-concept_11zon-scaled.jpg', 6, 23, 'published', '2025-06-08 14:39:40', '2025-06-08 14:40:02'),
(20, 'XPENG Bicara Soal Teknologi AI Terbaru Dan Delivery 2025', 'xpeng-bicara-soal-teknologi-ai-terbaru-dan-delivery-2025', 'Produsen mobil Tiongkok, XPENG mengumumkan inovasi terbarunya di gelaran Auto Shanghai 2025 yang sedang berlangsung. Terobosan tersebut, difokuskan pada teknologi kendaraan listrik (EV) serta pengembangan kecerdasan buatan (AI).\n\nSetelah sukses memiliki kemampuan menyeluruh dalam AI tahun lalu, XPENG kini arsitektur kecerdasan baru yang diberi judul XPENG World Foundation Model. Ini dikatakan sebagai ‘AI Brain’ generasi lanjut, yang merupakan lompatan dalam pengembangan lanjutan soal kecerdasan sebuah mobil.\n\nModel buatan XPENG ini memiliki parameter 35 kali lebih banyak dibanding AI yang tersedia di mobil-mobil yang ada. Mengutip pernyataan resminya, XPENG mengatakan kecerdasan buatan yang mereka rancang memiliki, “Kemampuan self-optimizing memungkinkan adaptasi secara real time terhadap berbagai skenario berkendara, dengan aplikasi mencakup kendaraan berbasis AI, robotika, dan mobil terbang.”', 'https://motomobinews.id/wp-content/uploads/2025/04/Xpeng-P7.jpg', 6, 23, 'published', '2025-06-08 14:44:09', '2025-06-08 14:44:12'),
(22, 'Era 6G Dimulai-Agen AI Bermunculan, 7 Tren Teknologi Terbaru di 2025', 'era-6g-dimulai-agen-ai-bermunculan-7-tren-teknologi-terbaru-di-2025', 'Perkembangan teknologi digital akan berkembang pesat pada 2025, banyak inovasi baru yang akan muncul, mulai dari jaringan konektivitas yang semakin termutakhir, hingga kendaraan yang makin marak bergerak secara otomatis.\nMengutip tulisan seorang dosen ilmu bisnis dan manajemen di Keele University, Lewis Endlar setidaknya ada tren teknologi digital baru pada tahun ini.', 'https://akcdn.detik.net.id/visual/2021/06/07/6g_169.jpeg?w=900&q=80', 6, 23, 'published', '2025-06-08 14:45:55', '2025-06-08 14:45:59'),
(23, '𝐁𝐞𝐧𝐜𝐚𝐧𝐚 𝐋𝐨𝐧𝐠𝐬𝐨𝐫 𝐝𝐢 𝐓𝐢𝐛𝐚𝐧 𝐊𝐨𝐩𝐞𝐫𝐚𝐬𝐢, 𝐏𝐞𝐦𝐤𝐨 𝐁𝐚𝐭𝐚𝐦 𝐂𝐞𝐩𝐚𝐭 𝐓𝐚𝐧𝐠𝐠𝐚𝐩 𝐭𝐮𝐫𝐮𝐧𝐤𝐚𝐧 𝐓𝐢𝐦 𝐏𝐞𝐧𝐚𝐧𝐠𝐚𝐧𝐚𝐧 𝐃𝐚𝐫𝐮𝐫𝐚𝐭 𝐝𝐚𝐧 𝐂𝐞𝐠𝐚𝐡 𝐋𝐨𝐧𝐠𝐬𝐨𝐫 𝐒𝐮𝐬𝐮𝐥𝐚𝐧', '-', 'Pemerintah Kota Batam segera bertindak cepat dalam menangani bencana longsor yang terjadi di Blok S, Tiban Koperasi. Wakil Wali Kota Batam, Amsakar Achmad, mengimbau seluruh warga yang tinggal di sekitar area longsor untuk segera mengungsi ke tempat yang lebih aman.\n\n“Berdasarkan prediksi BMKG, cuaca ekstrem diperkirakan masih akan berlangsung selama tujuh hari ke depan. Oleh karena itu, kami meminta warga yang berada di Blok S, khususnya di dekat area bukit, untuk segera mengungsi guna menghindari potensi longsor susulan,” ujar Amsakar saat meninjau lokasi bencana, pada Senin (13/1/2025).', 'https://mediacenter.batam.go.id/wp-content/uploads/sites/60/2025/01/473591987_1042502154576988_9193220526962366828_n.jpg', 5, 23, 'published', '2025-06-08 15:04:54', '2025-06-08 15:04:57'),
(24, 'Hari Musik Nasional 2025, Kemenbud Luncurkan Piringan Hitam \"Indonesia Raya\" dengan Delapan Aransemen', 'hari-musik-nasional-2025-kemenbud-luncurkan-piringan-hitam-indonesia-raya-dengan-delapan-aransemen', 'Kementerian Kebudayaan Republik Indonesia (kemenbud RI) menggelar peringatan Hari Musik Nasional 2025 di Plaza Insan Berprestasi, Gedung A Kompleks Kementerian Kebudayaan. Dengan tema \"Ragam Budaya, Memajukan Musik Indonesia,\" acara ini juga mencakup dua kegiatan penting: Gelar Wicara dan peluncuran piringan hitam kompilasi lagu kebangsaan \"Indonesia Raya\" yang diciptakan oleh Wage Rudolf Supratman, berisi delapan aransemen lagu tersebut.\n\nSekretaris Direktorat Jenderal Pengembangan, Pemanfaatan, dan Pembinaan Kebudayaan, Judi Wahjudin, menyampaikan bahwa Hari Musik Nasional adalah momen untuk mengapresiasi kontribusi musisi Indonesia dalam perkembangan musik tanah air serta memperkuat ekosistem musik Indonesia. Perayaan ini pertama kali ditetapkan oleh Presiden Susilo Bambang Yudhoyono melalui Keputusan Presiden No 10 Tahun 2013, untuk mengenang karya besar musisi Indonesia.', 'https://www.menpan.go.id/site/images/berita_foto_backup/2025/Maret/20250310_-_Hari_Musik_Nasional_2025_Kemenbud_Luncurkan_Piringan_Hitam_Indonesia_Raya_dengan_Delapan_Aransemen.jpeg', 1, 23, 'published', '2025-06-08 15:07:57', '2025-06-08 15:08:00'),
(25, '2025, Museum Batik Pekalongan Dorong Transformasi Jadi Ruang Budaya Inklusif', '2025-museum-batik-pekalongan-dorong-transformasi-jadi-ruang-budaya-inklusif', 'Di awal tahun 2025, Museum Batik Pekalongan menyampaikan visi barunya, yakni menjadi Museum Inklusi, sebuah museum yang terbuka untuk semua kalangan. Hal ini disampaikan Kepala Museum Batik Pekalongan, Nurhayati Sinaga saat ditemui di ruang kerjanya, Jumat (31/1/2025).\n\nIa menegaskan bahwa perubahan ini bertujuan untuk menciptakan ruang yang nyaman bagi setiap pengunjung, sehingga mereka merasa seperti berada di rumah sendiri. “Kami ingin Museum Batik menjadi tempat yang ramah bagi semua, termasuk penyandang disabilitas, serta pengunjung dari berbagai latar belakang suku, bahasa, dan agama,” ujarnya.\n', 'https://pekalongankota.go.id/upload/berita/berita_20250131021238.jpeg', 1, 23, 'published', '2025-06-10 13:11:06', '2025-06-10 13:11:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `email`, `role`, `created_at`, `updated_at`, `token`) VALUES
(6, 'dwi', '1234', 'dwi@gmail.com', 'admin', '2025-05-07 12:49:21', '2025-06-01 16:37:43', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzQ4Nzk1ODYzLCJleHAiOjE3NDg4ODIyNjN9.sca3WO19qXdWP7TSjlVVCRfUevDG_BaC2J1DRVzS-nc'),
(7, 'arya', '$2b$10$5UK7r8LhkBo9qRZaWv2ly.bdpsstKBBFSlNsgDFXbGCQDF4L3mchy', 'arya@gmail.com', 'user', '2025-05-07 12:49:33', '2025-05-07 12:49:33', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzQ2NjIyMTczLCJleHAiOjE3NDY3MDg1NzN9.xs2A1LYqQ6OOSId_7nDWyYQiSvJzr0hXZJB6WF42ZI0'),
(15, 'uwii', '$2b$10$/fPE.FAr3KNlLCI4QxtPLu7YpuZsH7p53hT82TVwLZA5e3RGcz4JK', 'wiu@gmail.com', 'user', '2025-05-19 18:15:01', '2025-05-19 18:15:01', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTc0NzY3ODUwMSwiZXhwIjoxNzQ3NzY0OTAxfQ.TeAp_VpY3KmC3DLglZqPvLWnqnGWP7eaK_d8qR_muwQ'),
(23, 'rahmabeee', '$2b$10$Z6n8Y1KZYJVHLZiuaw49j.nUNxZD8OaCMW26LqFCOK9yUyrWnDQii', 'rahmaallysa7@gmail.com', 'admin', '2025-06-08 11:40:17', '2025-06-10 12:07:18', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTc0OTU1NzIzOCwiZXhwIjoxNzQ5NjQzNjM4fQ.yJynOKI1n0EhT_n3_pDr5Vpv8BY0yhaC1jrwSgsWNuk');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_berita` (`id_news`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id_news`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `id_kategori` (`id_category`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `news`
--
ALTER TABLE `news`
  MODIFY `id_news` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_news`) REFERENCES `news` (`id_news`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`) ON DELETE SET NULL,
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
