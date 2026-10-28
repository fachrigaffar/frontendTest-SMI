# FachShop — Product Catalog

Aplikasi katalog produk berbasis React dan TypeScript. Pengguna dapat login dengan akun demo, mencari produk, memfilter kategori, mengurutkan hasil, dan menjelajahi katalog DummyJSON dengan pagination. UI mendukung tema terang/gelap dan layout responsif.

## Menjalankan aplikasi

Persyaratan: Node.js 20.19+ atau 22.12+.

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite (biasanya `http://localhost:5173`). Untuk memeriksa build produksi:

```bash
npm test
npm run build
npm run preview
```

### Akun demo

- Email: `emily.johnson@fachshop.demo`
- Password: `emilyspass`

Login memvalidasi email dan mencocokkan kredensial terhadap data demo lokal. Ini adalah simulasi front-end untuk coding test, bukan mekanisme autentikasi produksi. Sesi profil disimpan di `localStorage`.

## Bahasa dan tools

- **TypeScript** — tipe API dan domain untuk mengurangi kesalahan data.
- **React** — komponen UI dan state aplikasi.
- **Vite** — server pengembangan dan bundler.
- **Tailwind CSS** — utilitas styling tersedia; token dan CSS komponen ditulis khusus agar identitas visual tidak generik.

## Library tambahan

- **React Router** — routing login/katalog dan protected route.
- **lucide-react** — ikon UI konsisten dan ringan.
- **Vitest + jsdom** — pengujian fungsi domain dan auth tanpa browser.
- **PostCSS + Autoprefixer** — pemrosesan Tailwind dan kompatibilitas CSS.

Aplikasi memakai Fetch API bawaan browser; Axios tidak diperlukan. Form login menggunakan validasi native TypeScript, sehingga react-hook-form/Zod dan pustaka toast tidak ditambahkan.

## Struktur utama

```text
src/
├── components/
│   ├── common/       # Button, Navbar, ErrorMessage, EmptyState
│   └── products/     # SearchBar, ProductCard, ProductGrid, Pagination
├── data/             # kredensial demo
├── hooks/            # useAuth, useProducts, useDebounce
├── pages/            # LoginPage, ProductsPage
├── routes/           # ProtectedRoute
├── services/         # API client, auth, product service
├── types/            # model API dan domain
└── utils/            # normalisasi produk, formatter
```

## Keputusan desain

- **Logic terpisah dari UI:** komponen tidak melakukan fetch. `productService` mengakses DummyJSON, `useProducts` mengatur request dan state, `normalizeProducts` menyaring item tanpa ID dan memasang nilai fallback untuk data tidak valid.
- **Status data:** katalog menampilkan skeleton saat loading, pesan dan tombol coba lagi jika API error, EmptyState bila hasil tidak ada, placeholder bila gambar gagal atau tidak tersedia. Harga/rating/stok yang hilang tidak menampilkan nilai palsu.
- **Pencarian dan katalog:** query memakai endpoint `/products/search?q=...` dengan debounce 350 ms. Filter kategori memakai `/products/category/{slug}`. Pagination memakai `limit=12` dan `skip`. Sorting bekerja di halaman hasil aktif.
- **UI/UX:** permukaan putih/abu muda, aksen indigo, font DM Sans/Manrope, fokus keyboard terlihat, dukungan reduced motion, skeleton, hover halus, dan breakpoint mobile/tablet/desktop. Tema dapat diubah lewat tombol navbar dan preferensi tersimpan lokal.
- **API:** endpoint publik `https://dummyjson.com`; koneksi internet dibutuhkan untuk produk/kategori. Tidak memerlukan API key.

## Catatan batasan

Login demo hanya untuk demonstrasi front-end dan password contoh berada dalam source code; jangan gunakan pendekatan ini untuk autentikasi pengguna sungguhan. Fitur detail produk tidak termasuk kebutuhan yang dipilih dalam PRD.
