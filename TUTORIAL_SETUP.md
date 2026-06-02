# 🚀 Tutorial Menjalankan Project Cafier

Selamat datang di project Cafier! Karena sistem ini terbagi menjadi 3 bagian utama (API Backend, Web Frontend, dan Mobile App) yang saling terhubung, ada beberapa langkah yang wajib diikuti agar semuanya bisa berjalan dengan lancar tanpa *error*.

Ikuti panduan di bawah ini secara berurutan.

---

## 🛠️ 1. Persiapan Awal (Hanya Saat Pertama Kali Clone/Pull)

Jika Anda baru saja mem-*pull* project ini dari GitHub ke laptop baru, Anda **wajib** melakukan instalasi *dependencies* untuk setiap folder.

Buka terminal di dalam VS Code Anda, lalu jalankan perintah berikut secara bergantian:

**Untuk Backend (Laravel API):**
```bash
cd CafierLaravel
copy .env.example .env
composer install
php artisan key:generate
cd ..
```

**Untuk Frontend (Web):**
```bash
cd CafierWeb
copy .env.example .env
composer install
php artisan key:generate
cd ..
```

**Untuk Mobile (React Native/Expo):**
```bash
cd CafierMobile
npm install
cd ..
```

---

## 🏃‍♂️ 2. Cara Menjalankan Semua Server Sekaligus

Agar tidak terjadi tabrakan port, Anda harus membuka **3 Terminal baru** di VS Code dan menjalankan setiap bagian secara terpisah.

### Terminal 1: Menjalankan API Backend
1. Masuk ke folder API: `cd CafierLaravel`
2. Jalankan server di port **8000**:
   ```bash
   php artisan serve --port=8000
   ```

### Terminal 2: Menjalankan Web Admin/Frontend
1. Masuk ke folder Web: `cd CafierWeb`
2. Jalankan server di port **8001**:
   ```bash
   php artisan serve --port=8001
   ```
*(Web sekarang bisa dibuka di browser: `http://127.0.0.1:8001`)*

### Terminal 3: Menjalankan Ngrok (Penting untuk HP!)
Aplikasi Mobile tidak bisa mendeteksi `127.0.0.1` dari HP Anda. Kita butuh jembatan bernama Ngrok.
1. Pastikan Anda berada di root folder `Cafier` (jangan masuk ke folder lain).
2. Jalankan Ngrok:
   ```bash
   .\ngrok.exe http 8000
   ```
3. Tunggu sampai muncul tulisan hijau **Forwarding**.
4. **Copy URL biru** yang berakhiran `ngrok-free.dev` (misal: `https://abcd.ngrok-free.dev`).
5. Buka file `CafierMobile/service/utils.ts`.
6. Cari tulisan `baseURL` (baris ke-11) dan `IMAGE_BASE_URL` (baris ke-6).
7. **Paste link Ngrok** Anda ke sana.
   - `IMAGE_BASE_URL` harus diakhiri dengan `/storage/`
   - `baseURL` harus diakhiri dengan `/api`

### Terminal 4: Menjalankan Aplikasi Mobile
1. Masuk ke folder Mobile: `cd CafierMobile`
2. Jalankan Expo:
   ```bash
   npx expo start
   ```
3. Scan **QR Code** yang muncul menggunakan aplikasi **Expo Go** di HP Anda, atau tekan tombol `w` untuk membuka di Web Browser.

---

## 💡 Troubleshooting (Solusi Error Sering Terjadi)

- **Menu tidak ditemukan di HP**: Itu artinya URL Ngrok Anda sudah kadaluwarsa (karena laptop sempat mati/restart). Silakan matikan Ngrok, jalankan ulang `.\ngrok.exe http 8000`, lalu update lagi link-nya di `utils.ts`.
- **Gambar menu hilang**: Pastikan Anda sudah menjalankan perintah `php artisan storage:link` di dalam folder `CafierLaravel`.
- **Gagal Login di Web**: Pastikan Anda membuka web di `http://127.0.0.1:8001`, JANGAN menggunakan port `8000`.

Selamat mengembangkan fitur, Barista! ☕
