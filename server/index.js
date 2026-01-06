const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// DEBUG: Kodun nerede çalıştığını ve .env dosyasını nerede aradığını görelim
console.log("1. Çalışma Dizini (CWD):", process.cwd());
console.log("2. Dosyanın Olduğu Dizin (__dirname):", __dirname);
const envPath = path.join(__dirname, '.env');
console.log("3. .env Dosyası Burada Aranıyor:", envPath);

// .env dosyasını ZORLA bu yoldan okutuyoruz
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.log("!!! HATA: .env dosyası bulunamadı veya okunamadı !!!");
  console.log("Hata Detayı:", result.error);
} else {
  console.log(">>> BAŞARILI: .env dosyası yüklendi.");
}

// Değişkenleri kontrol edelim
console.log("4. SMTP_USER Değeri:", process.env.SMTP_USER);

// BU KISIM ÇOK ÖNEMLİ: Auth route'ları env yüklendikten SONRA çağrılmalı
const authRoutes = require('./routes/auth'); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Bağlandı'))
  .catch(err => console.error('MongoDB Bağlantı Hatası:', err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});