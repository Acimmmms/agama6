# 🌐 Cara Aktifkan GitHub Pages (Live Website)

Ikuti langkah-langkah berikut untuk mengaktifkan GitHub Pages agar website bisa diakses secara online:

---

## Langkah 1: Buka Repository GitHub

Buka browser dan pergi ke:
```
https://github.com/Acimmmms/agama6
```

---

## Langkah 2: Buka Settings

1. Klik tab **"Settings"** di menu repository
2. Scroll ke bawah sampai menemukan bagian **"Pages"**

---

## Langkah 3: Konfigurasi GitHub Pages

Di bagian **"Build and deployment"**:

| Setting | Pilihan |
|---------|---------|
| **Source** | Deploy from a branch |
| **Branch** | main |
| **Folder** | / (root) |

Atau jika file HTML ada di folder html:
| Setting | Pilihan |
|---------|---------|
| **Source** | Deploy from a branch |
| **Branch** | main |
| **Folder** | /html |

---

## Langkah 4: Simpan

1. Klik tombol **"Save"**
2. Tunggu sekitar 1-2 menit untuk proses deployment
3. Refresh halaman Settings

---

## Langkah 5: Buka Website

Setelah deployment berhasil, Anda akan melihat link seperti ini:
```
🌐 Your site is live at https://acimmmms.github.io/agama6/
```

**Klik link tersebut untuk membuka website!**

---

## 🔄 Cara Update Website

Jika Anda ingin mengedit konten website:

1. Edit file di komputer lokal Anda
2. Commit dan push perubahan:
   
```
bash
   git add .
   git commit -m "Update: Deskripsi perubahan"
   git push origin main
   
```
3. GitHub Pages akan otomatis memperbarui website dalam beberapa menit!

---

## 📝 Catatan Penting

- GitHub Pages membutuhkan beberapa menit untuk aktif pertama kali
- Pastikan repository bersifat **Public** (bukan Private)
- Jika menggunakan folder /html, URL menjadi: `https://acimmmms.github.io/agama6/html/`

---

## ✅ Checklist

- [x] Repository sudah dibuat
- [x] Kode sudah di-push ke GitHub
- [x] README sudah diperbarui
- [ ] GitHub Pages diaktifkan
- [ ] Website bisa diakses online

---

**Happy coding! 🚀🕌**
