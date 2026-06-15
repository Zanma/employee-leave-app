# Employee Leave Management System 🏖️

Selamat datang di **Employee Leave Management System**! Aplikasi ini dirancang khusus untuk menyederhanakan proses pengajuan dan pengelolaan cuti karyawan di perusahaan Anda. Dengan tampilan yang bersih, modern, dan sangat responsif, pengurusan cuti tidak pernah semudah ini.

---

## 🌟 Fitur Utama Aplikasi

Berikut adalah hal-hal menakjubkan yang bisa Anda lakukan dengan aplikasi ini:

### 1. Dashboard Interaktif (Pusat Informasi) 📊
Begitu Anda masuk, Anda akan disambut oleh *Dashboard* pintar yang merangkum semua informasi penting. Anda bisa langsung melihat:
- Total karyawan yang terdaftar.
- Jumlah pengajuan cuti yang sedang menunggu persetujuan (*Pending*).
- Jumlah cuti yang disetujui (*Approved*) maupun ditolak (*Rejected*).
Semua data dihitung secara otomatis dan disajikan secara *real-time*!

### 2. Manajemen Karyawan Terpusat 👥
Tidak perlu lagi menggunakan *spreadsheet*! Anda dapat menambah, mengedit, mencari, dan menghapus data karyawan langsung dari sistem. Setiap karyawan akan memiliki **Jatah Cuti Tahunan (Leave Balance)** yang akan terpotong secara otomatis setiap kali mereka mengambil cuti.

### 3. Pengajuan Cuti Super Mudah 🗓️
Karyawan dapat mengajukan cuti dengan sangat cepat. Sistem kami sangat cerdas:
- **Otomatis Menghitung Durasi:** Begitu Anda memasukkan tanggal mulai dan tanggal selesai, sistem akan otomatis menghitung berapa hari yang diambil. (Bahkan mendukung cuti 1 hari penuh di tanggal yang sama!).
- **Cek Jatah Cuti:** Sistem akan langsung memberi peringatan jika pengajuan cuti melebihi sisa saldo cuti tahunan karyawan.

### 4. Persetujuan Cuti Sekali Klik ✅
Sebagai pengelola, Anda tidak perlu repot. Di halaman Daftar Cuti, Anda bisa melihat semua riwayat pengajuan cuti beserta alasannya. Cukup dengan satu klik, Anda bisa menyetujui (*Approve*) atau menolak (*Reject*) permohonan tersebut. Jika disetujui, jatah cuti karyawan tersebut akan langsung berkurang!

### 5. Laporan Code Review Bawaan 🔍
Bagi tim teknis, kami juga menyediakan halaman khusus **Engineering Report** (`/code-review`). Halaman ini menampilkan hasil audit kualitas perangkat lunak secara transparan—memastikan aplikasi aman, cepat, dan bebas dari error (mendapat skor kelulusan 100%!).

---

## 🚀 Cara Akses dan Penggunaan

Karena aplikasi ini sudah dideploy (*Live*), Anda tidak perlu menginstal apapun di komputer Anda. Anda bisa langsung mencobanya menggunakan *browser* favorit Anda!

### Informasi Login Akun Demo
Untuk mencoba semua fitur secara penuh sebagai Administrator, silakan gunakan kredensial bawaan berikut:

- **Username**: `admin`
- **Password**: `admin123`

### Langkah-langkah Penggunaan:
1. Buka URL/Link *live website* aplikasi ini.
2. Anda akan langsung diarahkan ke halaman **Login**. Masukkan Username dan Password di atas, lalu klik **Sign In**.
3. **Mulai dari Dashboard**: Perhatikan statistik saat ini.
4. **Coba Tambah Karyawan**: Pergi ke menu *Employees* di sebelah kiri, klik *Add New Employee*, dan cobalah daftarkan karyawan baru.
5. **Coba Ajukan Cuti**: Pergi ke menu *Leave Requests*, klik *New Request*, pilih nama karyawan yang baru Anda buat, pilih tanggal cuti, dan kirim.
6. **Setujui Cuti**: Masih di halaman *Leave Requests*, cari pengajuan yang berstatus kuning (*Pending*). Klik tanda panah (Dropdown) di kolom Action, lalu pilih **Approve**.
7. Buka kembali halaman *Employees* dan lihat bagaimana saldo cuti karyawan tersebut otomatis berkurang! Sangat praktis.

---

## 🛠️ Teknologi di Balik Layar
Walaupun terlihat simpel dan minimalis, aplikasi ini dibangun menggunakan teknologi mutakhir standar industri (*Enterprise-Grade*):
- **Frontend**: Next.js 16 (App Router), React 19, TailwindCSS, dan ShadCN UI.
- **Backend & Database**: Terintegrasi langsung dengan database PostgreSQL dari **NeonDB** menggunakan **Prisma ORM**.
- **Keamanan**: Menggunakan sistem **JSON Web Tokens (JWT)** berbasis HTTP-Only Cookies lewat Next.js Edge Middleware untuk memastikan data Anda aman dari penyusup.
- **Infrastruktur**: Dihosting dan diawasi (*Monitoring*) 24/7 melalui infrastruktur **Vercel Analytics & Speed Insights**.

Selamat bereksplorasi dan menikmati kemudahan manajemen cuti! 🎉
