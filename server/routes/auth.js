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

router.post('/send-code', async (req, res) => {
  const { email, password } = req.body;

  const passwordRules = [
    { 
      condition: password.length < 6, 
      message: 'Şifreniz minimum 6 karakter olmalıdır.' 
    },
    { 
      condition: password.length > 22, 
      message: 'Şifreniz maksimum 22 karakter olabilir.' 
    },
    { 
      condition: /^(\d+|[a-z]+|[A-Z]+|[^a-zA-Z0-9]+)$/.test(password), 
      message: 'Şifreniz güvenli değil.' 
    }
  ];

  const failedRule = passwordRules.find(rule => rule.condition);
  if (failedRule) {
    return res.status(400).json({ message: failedRule.message });
  }

  const emailRegex = /^[a-zA-Z0-9]+@dogus\.edu\.tr$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Lütfen geçerli bir Doğuş Üniversitesi mail adresi giriniz.' });
  }

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
  const { fullName, username, email, password, code } = req.body;
  if (!username || /[^a-zA-Z0-9]/.test(username)) {
    return res.status(400).json({ message: 'Kullanıcı adı boşluk veya özel karakter içeremez.' });
  }
  //  Şifre gereksinimlerinin kontrol etmesi

  const passwordRules = [
    { 
      condition: password.length < 6, 
      message: 'Şifreniz minimum 6 karakter olmalıdır.' 
    },
    { 
      condition: password.length > 22, 
      message: 'Şifreniz maksimum 22 karakter olabilir.' 
    },
    { 
      condition: /^(\d+|[a-z]+|[A-Z]+|[^a-zA-Z0-9]+)$/.test(password), 
      message: 'Şifreniz güvenli değil.' 
    }
  ];

  const failedRule = passwordRules.find(rule => rule.condition);
  if (failedRule) {
    return res.status(400).json({ message: failedRule.message });
  }
  try {
    // Veritabanındaki kodu kontrol et
    const record = await Verification.findOne({ email });
    
    if (!record || record.code !== code) {
      return res.status(400).json({ message: 'Hatalı veya süresi dolmuş doğrulama kodu.' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      if (existingUser.email === email) return res.status(400).json({ message: 'Bu email zaten kayıtlı.' });
      if (existingUser.username === username) return res.status(400).json({ message: 'Bu kullanıcı adı zaten alınmış.' });
    }

    // Kod doğru, kullanıcıyı oluştur
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, username, email, password: hashedPassword });
    await newUser.save();

    await Verification.deleteOne({ email });
    res.status(201).json({ message: 'Kayıt başarılı.' });

  } catch (error) {
    res.status(500).json({ message: 'Kayıt sırasında hata oluştu.' });
  }
});

// Giriş Yapma (Aynen kalabilir)
router.post('/signin', async (req, res) => {
  // Frontend'den 'identifier' adında tek bir veri bekliyoruz
  const { identifier, password } = req.body;

  try {
    // Veritabanında (Email == identifier) VEYA (Username == identifier) olanı bul
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { username: identifier }] 
    });

    if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Şifre hatalı.' });

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET,             
      { expiresIn: '30d' }                
    );

    res.status(200).json({ 
      message: 'Giriş başarılı', 
      token, 
      // Frontend'e hem fullName hem username dönebiliriz
      user: { 
        id: user._id, 
        username: user.username, 
        fullName: user.fullName, 
        email: user.email 
      } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

module.exports = router;