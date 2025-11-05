const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ekle, listele, sil, guncelle  } = require('./notes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Notları listele
app.get('/api/notes', (req, res) => {
  const etiket = req.query.etiket || '';
  const notlar = listele(etiket, true); // true: JSON döndür
  res.json(notlar);
});

// Not ekle
app.post('/api/notes', (req, res) => {
  const { baslik, icerik, etiket } = req.body;
  ekle(baslik, icerik, etiket);
  res.json({ status: 'ok' });
});

// Not sil
app.delete('/api/notes/:id', (req, res) => {
  sil(req.params.id);
  res.json({ status: 'silindi' });
});

app.listen(PORT, () => {
  console.log(`🌐 Web sunucu çalışıyor: http://localhost:${PORT}`);
});

app.put('/api/notes/:id', (req, res) => {
  const basari = guncelle(req.params.id, req.body);
  if (basari) {
    res.json({ status: 'güncellendi' });
  } else {
    res.status(404).json({ error: 'Not bulunamadı' });
  }
});