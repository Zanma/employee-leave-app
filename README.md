# Employee Leave Management System

## Deskripsi Singkat
Employee Leave Management System adalah aplikasi berbasis web yang dirancang untuk mendigitalisasi dan memusatkan proses administrasi pengajuan cuti karyawan. Sistem ini memungkinkan pencatatan data secara akurat, pelacakan saldo cuti secara otomatis, dan pengelolaan persetujuan cuti yang lebih terstruktur.

---

## Fungsionalitas Utama Sistem

Sistem ini mencakup beberapa modul utama yang dirancang untuk mendukung kegiatan operasional HR (Human Resources) dan Administrator:

### 1. Modul Dashboard Eksekutif
Halaman beranda yang menyediakan ringkasan metrik operasional secara real-time. Informasi yang disajikan meliputi:
- Total jumlah karyawan aktif.
- Akumulasi status pengajuan cuti (Menunggu Persetujuan, Disetujui, dan Ditolak).
Data pada metrik ini akan terus diperbarui secara otomatis setiap kali terjadi perubahan status pada sistem.

### 2. Modul Manajemen Karyawan
Modul untuk melakukan pengelolaan basis data karyawan (Create, Read, Update, Delete). Fitur utama pada modul ini meliputi:
- Pendaftaran karyawan baru dengan menetapkan profil dan Jatah Cuti Tahunan (Leave Balance).
- Pemantauan sisa saldo cuti masing-masing karyawan secara transparan.

### 3. Modul Pengajuan Cuti (Leave Request)
Fasilitas bagi pengguna untuk mengajukan permohonan cuti baru ke dalam sistem. Modul ini dilengkapi dengan aturan validasi internal:
- **Kalkulasi Otomatis:** Sistem menghitung durasi cuti secara otomatis berdasarkan tanggal mulai (Start Date) dan tanggal selesai (End Date).
- **Proteksi Saldo Cuti:** Sistem menolak pengajuan cuti apabila durasi hari yang diajukan melebihi sisa saldo cuti tahunan karyawan terkait.

### 4. Modul Otorisasi dan Persetujuan
Fasilitas khusus Administrator untuk meninjau dan memberikan keputusan atas pengajuan cuti karyawan. 
- Administrator memiliki otoritas penuh untuk mengubah status pengajuan yang masih *Pending* menjadi *Approved* (Disetujui) atau *Rejected* (Ditolak).
- Apabila pengajuan disetujui, sistem secara otomatis akan memotong saldo cuti tahunan milik karyawan yang bersangkutan berdasarkan durasi hari cuti.

### 5. Laporan Evaluasi Perangkat Lunak (Code Review)
Tersedia halaman khusus (`/code-review`) yang memuat laporan teknis terkait keandalan, keamanan, dan arsitektur sistem sebagai bentuk transparansi kualitas pengembangan perangkat lunak (skor pemenuhan standar 100%).

---

## Panduan Akses dan Penggunaan Akses Demo

Aplikasi ini telah di-deploy pada server cloud publik dan dapat diakses menggunakan peramban web standar tanpa memerlukan instalasi tambahan. 

### Kredensial Pengguna (Mode Administrator)
Untuk keperluan pengujian, silakan gunakan kredensial berikut untuk masuk ke dalam sistem:
- **Username** : `admin`
- **Password** : `admin123`

### Langkah-Langkah Penggunaan Dasar:
1. Akses tautan publik dari aplikasi ini melalui peramban web Anda.
2. Pada halaman **Login**, masukkan Username dan Password yang tercantum di atas, kemudian klik **Sign In**.
3. **Melihat Ringkasan**: Setelah login, Anda akan diarahkan ke halaman **Dashboard** untuk meninjau statistik saat ini.
4. **Mendaftarkan Karyawan**: Arahkan ke menu **Employees** di panel kiri. Klik **Add New Employee** untuk memasukkan data karyawan beserta jatah cuti awal.
5. **Simulasi Pengajuan Cuti**: Arahkan ke menu **Leave Requests**. Klik **New Request**, lalu pilih salah satu nama karyawan, tentukan rentang tanggal, isi deskripsi keperluan, dan klik tombol simpan.
6. **Simulasi Persetujuan**: Pada halaman yang sama, temukan pengajuan yang berstatus *Pending*. Gunakan tombol aksi (Dropdown) untuk memilih **Approve**.
7. **Verifikasi Saldo**: Anda dapat kembali ke halaman **Employees** untuk memverifikasi bahwa saldo cuti karyawan tersebut telah berkurang secara akurat.

---

## Arsitektur & Spesifikasi Teknis Sistem

Sistem dikembangkan menggunakan standar teknologi modern untuk menjamin keamanan dan efisiensi:
- **Frontend Layer**: Next.js 16 (App Router), React 19, TailwindCSS, dan antarmuka komponen ShadCN UI.
- **Database Layer**: Database PostgreSQL terkelola (NeonDB) terintegrasi menggunakan abstraksi Prisma ORM.
- **Security Mechanism**: Mengimplementasikan JSON Web Tokens (JWT) yang dienkripsi dengan algoritma HS256, serta divalidasi pada lapisan Next.js Edge Middleware menggunakan *HTTP-Only Cookies* untuk memitigasi risiko keamanan client-side (XSS).
- **Infrastruktur & Observabilitas**: Deployment menggunakan infrastruktur Vercel, dilengkapi dengan *Vercel Analytics* terintegrasi untuk keperluan pemantauan performa (Web Vitals) dan operasional sistem secara berkelanjutan.
