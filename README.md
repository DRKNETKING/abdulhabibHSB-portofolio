# Abdulhabib Hasibuan — Portfolio

Portfolio website siap di-upload ke GitHub dan deploy ke Vercel.

## Isi
- `index.html` — halaman portfolio bilingual Indonesia/English
- `style.css` — desain responsive
- `script.js` — tombol bahasa dan menu mobile
- `assets/profile.jpeg` — foto profil formal
- `assets/favicon.png` — favicon
- `sertifikat/` — sertifikat kompetensi dan TOEFL
- `vercel.json` — header keamanan untuk deployment

## Deploy ke Vercel
1. Upload seluruh isi folder ini ke repository GitHub.
2. Import repository tersebut di Vercel.
3. Framework Preset: Other.
4. Build Command: kosong.
5. Output Directory: `.`
6. Deploy.

Catatan: Pastikan nama file dan struktur folder dipertahankan.

## Pengujian
Jalankan pemeriksaan referensi dan ID HTML sebelum deploy:

```bash
python3 scripts/validate_site.py
python3 -m http.server 4173
```
