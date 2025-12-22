# Laporan Teknis: Optimasi & Validitas Data Keuangan

**Tanggal:** 22 Desember 2025
**Perihal:** Perubahan Strategi Perhitungan Realisasi Anggaran (Resolusi Bug Data Ganda)
**Status:** Selesai / Teratasi

---

## 1. Latar Belakang Masalah
Dalam pengembangan modul **Statistik & Realisasi Keuangan**, ditemukan dua anomali data yang kritikal pada tampilan Dashboard:
1.  **Data Tidak Sinkron**: Beberapa item anggaran menampilkan nilai realisasi `0` (nol) meskipun terdapat transaksi yang sudah diinput.
2.  **Perhitungan Berlipat (Double/Quadruple Counting)**: Pada item induk (Top Level), total realisasi bisa melonjak hingga 4x lipat dari nilai sebenarnya (Contoh: Transaksi 5 Juta tertulis menjadi 20 Juta).

## 2. Analisis Akar Masalah (Root Cause)
Setelah dilakukan audit mendalam pada struktur database dan logika sistem, ditemukan bahwa masalah bersumber pada penggunaan kolom *cache* di tabel database (`nominal_actual` dan `jumlah_transaksi`).

*   **Penyebab Data Nol**: Kolom `nominal_actual` didesain untuk menyimpan total saldo secara otomatis, namun mekanisme update otomatis (Trigger) tidak berfungsi atau tidak ada. Akibatnya, nilai tetap `0` meskipun ada transaksi.
*   **Penyebab Data Berlipat**: Di sisi lain, ketika kolom ini *memiliki* nilai (misal dari data legacy), logika visualisasi sistem menjumlahkan kembali nilai tersebut ke atas (Roll-up).
    *   *Ilustrasi Masalah*: `Total Induk` = `Total Anak` + `Nilai Induk Sendiri`.
    *   Karena `Nilai Induk Sendiri` di database ternyata sudah berisi jumlah anak (akibat trigger lama), maka terjadi penjumlahan ganda: (5 Juta + 5 Juta = 10 Juta). Jika ini terjadi di 3-4 level kedalaman, angkanya meledak.

## 3. Keputusan Teknis (Solusi)
Kami memutuskan untuk mengubah strategi perhitungan dari **"Berbasis Cache Database"** menjadi **"Berbasis Transaksi Langsung (On-the-Fly Aggregation)"**.

### Perbandingan Strategi:

| Aspek | Strategi Lama (Cache) | Strategi Baru (Direct Calc) - **DIPILIH** |
| :--- | :--- | :--- |
| **Sumber Data** | Mengandalkan kolom `nominal_actual` di tabel Item. | Menghitung langsung dari tabel `realisasi_item_keuangan`. |
| **Akurasi** | **Rentah Masalah**. Data bisa "basi" (stale) jika trigger gagal update sepersian detik saja. | **100% Akurat**. Data yang tampil PASTI hasil penjumlahan struk transaksi yang ada. |
| **Resiko** | Tinggi. Rawan double counting. | Rendah. Logic terpusat di satu tempat. |
| **Performa** | Sangat Cepat (Microsecond). | Cepat (Millisecond). Masih sangat mumpuni untuk volume < 1 Juta transaksi. |

## 4. Tindakan yang Diambil
1.  **Code Refactoring**: Mengupdate logika backend (`summary.js`) agar mengabaikan kolom `nominal_actual` dan `jumlah_transaksi` yang bermasalah.
2.  **Implementation**: Sistem kini mengambil data dari "Source of Truth" (transaksi asli) dan melakukan agregasi (penjumlahan) secara *real-time* saat halaman dibuka.
3.  **Deprecation**: Kolom `nominal_actual` dan `jumlah_transaksi` di database kini statusnya **Deprecated** (Tidak Digunakan) untuk menghindari kebingungan di masa depan.

## 5. Kesimpulan
Dengan perubahan ini, masalah "Data 0" dan "Data 20 Juta" telah teratasi permanen. Sistem kini menjamin bahwa angka yang tampil di Dashboard Statistik adalah representasi akurat dari input transaksi harian, tanpa risiko selisih perhitungan.

---
*Dibuat oleh Tim Pengembang Sistem Informasi*
