# Warkop Backend

Warkop Backend adalah aplikasi backend open source berbasis TypeScript dan Express.js yang menyediakan RESTful API untuk platform rekrutmen modern. Backend ini terintegrasi dengan layanan AI (Google Gemini) untuk fitur analisis resume, serta mendukung manajemen kandidat, interviewer, lowongan pekerjaan, dan user profile.

## Fitur Utama

- **Manajemen Kandidat**: CRUD kandidat, filter berdasarkan job dan lokasi.
- **Manajemen Interviewer**: CRUD interviewer, filter berdasarkan job.
- **Manajemen Lowongan Pekerjaan**: CRUD data lowongan pekerjaan.
- **Manajemen User**: Autentikasi, pembuatan dan update profil user.
- **Resume Analysis**: Endpoint khusus untuk analisis dan ekstraksi data dari resume, didukung oleh Google Gemini AI.
- **Integrasi Firebase**: Menggunakan Firestore untuk penyimpanan data user.
- **Middleware Autentikasi**: Mendukung proteksi endpoint dengan JWT/Firebase Auth.
- **Health Check**: Endpoint `/health` untuk monitoring status server.

## Arsitektur

- **Express.js** sebagai HTTP server utama.
- **TypeScript** untuk type safety dan maintainability.
- **Google Generative AI (Gemini)** untuk fitur AI resume analysis.
- **Firestore** sebagai database utama untuk user.
- **Modular Structure**: Setiap resource (candidate, interviewer, job, resume, user) memiliki controller dan repository terpisah.

## Instalasi & Menjalankan

1. **Clone repository**
   ```bash
   git clone https://github.com/zakimaliki/warkop-be.git
   cd warkop-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Buat file `.env`**
   ```
   GEMINI_API_KEY=your_google_gemini_api_key
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   ```

4. **Jalankan server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Akses API**
   - API utama: `http://localhost:3000/api`
   - Health check: `http://localhost:3000/health`

## Dokumentasi API

Setiap resource memiliki endpoint CRUD standar. Contoh endpoint:
- `POST /api/candidates` — Tambah kandidat
- `GET /api/jobs` — List lowongan pekerjaan
- `POST /api/resume` — Analisis resume dengan AI

> Untuk detail endpoint, silakan cek kode pada folder `controller/` dan `routes/`.

## Keterkaitan dengan Frontend

Proyek ini merupakan backend untuk [warkop-fe](https://github.com/zakimaliki/warkop-fe), sebuah aplikasi frontend open source berbasis Next.js. Seluruh API yang disediakan backend ini digunakan oleh frontend tersebut untuk membangun platform rekrutmen yang modern, responsif, dan didukung AI.

- **Frontend repository**: [warkop-fe](https://github.com/zakimaliki/warkop-fe)
- **Demo**: [warkop-fe.vercel.app](https://warkop-fe.vercel.app)

## Kontribusi

Kontribusi sangat terbuka! Silakan fork, buat branch, dan ajukan pull request. Untuk bug, saran, atau diskusi fitur, gunakan [issue tracker](https://github.com/zakimaliki/warkop-be/issues).

## Lisensi

Proyek ini berlisensi [ISC](LICENSE). 