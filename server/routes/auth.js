const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Verification = require('../models/Verification');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

console.log("Email User:", process.env.SMTP_USER); // Mail adresini basmalı
console.log("Email Pass:", process.env.SMTP_PASS ? "Dolu" : "Boş"); // Şifreyi açık basma, "Dolu" yazsa yeter

// Mail Gönderici Ayarları
const transporter = nodemailer.createTransport({
  service: 'gmail', // Host ve Port yerine direkt servis ismini kullanıyoruz
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 1. ADIM: Mail Kontrolü ve Kod Gönderme
router.post('/send-code', async (req, res) => {
  const { email } = req.body;

  try {
    // Domain Kontrolü (Test için yorum satırına alabilirsin)
    // if (!email.endsWith('@dogus.edu.tr')) {
    //   return res.status(400).json({ message: 'Sadece @dogus.edu.tr ile kayıt olunabilir.' });
    // }

    // Kullanıcı zaten var mı?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu mail adresi zaten kayıtlı.' });
    }

    // 6 Haneli Kod Üret
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Varsa eski kodu sil ve yenisini kaydet
    await Verification.findOneAndDelete({ email });
    await new Verification({ email, code }).save();

    // Mail Gönder
    await transporter.sendMail({
      from: process.env.SMTP_USER, // Elastic Email'de onaylı mailin
      to: email,
      subject: 'DOU360 Doğrulama Kodu',
      html: `
        <h3>Hoşgeldiniz!</h3>
        <p>DOU360 kayıt işleminiz için doğrulama kodunuz:</p>
        <h1 style="color: #4F46E5; letter-spacing: 5px;">${code}</h1>
        <p>Bu kod 10 dakika süreyle geçerlidir.</p>
      `
    });

    res.status(200).json({ message: 'Doğrulama kodu gönderildi.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Mail gönderilemedi. Lütfen tekrar deneyin.' });
  }
});

// 2. ADIM: Doğrulama ve Kayıt Olma
router.post('/signup', async (req, res) => {
  const { fullName, email, password, code } = req.body;

  try {
    // Veritabanındaki kodu kontrol et
    const record = await Verification.findOne({ email });
    
    if (!record) {
      return res.status(400).json({ message: 'Doğrulama kodu bulunamadı veya süresi dolmuş.' });
    }

    if (record.code !== code) {
      return res.status(400).json({ message: 'Hatalı doğrulama kodu.' });
    }

    // Kod doğru, kullanıcıyı oluştur
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    // Kullanılan kodu sil
    await Verification.deleteOne({ email });

    res.status(201).json({ message: 'Kayıt başarılı.' });

  } catch (error) {
    res.status(500).json({ message: 'Kayıt sırasında hata oluştu.' });
  }
});

// Giriş Yapma (Aynen kalabilir)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Şifre hatalı.' });

    // --- JWT OLUŞTURMA KISMI ---
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Token içine gizlenecek bilgi
      process.env.JWT_SECRET,             // Gizli anahtarımız
      { expiresIn: '30d' }                // Token 30 gün geçerli olsun
    );

    // Frontend'e hem kullanıcıyı hem de token'ı gönderiyoruz
    res.status(200).json({ 
      message: 'Giriş başarılı', 
      token, 
      user: { id: user._id, name: user.fullName, email: user.email } 
    });

  } catch (error) {
    console.error(error); // Hata detayını görmek için
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

module.exports = router;