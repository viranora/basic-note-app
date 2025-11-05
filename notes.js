const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dosyaYolu = path.join(__dirname, 'notes.json');

// JSON oku
function oku() {
  if (!fs.existsSync(dosyaYolu)) return [];
  const veri = fs.readFileSync(dosyaYolu, 'utf-8');
  return JSON.parse(veri);
}

// JSON yaz
function yaz(notlar) {
  fs.writeFileSync(dosyaYolu, JSON.stringify(notlar, null, 2), 'utf-8');
}

// Not ekle
function ekle(baslik, icerik, etiket = '') {
  const notlar = oku();
  const yeniNot = {
    id: uuidv4(),
    baslik,
    icerik,
    tarih: new Date().toISOString(),
    etiket,
    sabit: false
  };
  notlar.push(yeniNot);
  yaz(notlar);
  console.log('✅ Not eklendi.');
}

// Listele
function listele(filtre = '', jsonMod = false) {
  const notlar = oku();
  const sirali = [...notlar].sort((a, b) => b.sabit - a.sabit);
  const filtreli = filtre ? sirali.filter(n => n.etiket === filtre) : sirali;

  if (jsonMod) return filtreli; // React için JSON döndür

  if (filtreli.length === 0) return console.log('📭 Hiç not yok.');
  filtreli.forEach((not, i) => {
    console.log(`${i + 1}. [${not.id}] ${not.baslik} (${not.etiket}) ${not.sabit ? '📌' : ''}`);
    console.log(`   ${not.icerik}`);
    console.log(`   ${not.tarih}`);
  });
}


// Sil
function sil(id) {
  const notlar = oku();
  const kalanlar = notlar.filter(n => n.id !== id);
  if (notlar.length === kalanlar.length) return console.log('❌ Not bulunamadı.');
  yaz(kalanlar);
  console.log('🗑️ Not silindi.');
}

// Sabitle
function sabitle(id) {
  const notlar = oku();
  const hedef = notlar.find(n => n.id === id);
  if (!hedef) return console.log('❌ Not bulunamadı.');
  hedef.sabit = true;
  yaz(notlar);
  console.log('📌 Not sabitlendi.');
}

function guncelle(id, yeniVeri) {
  const notlar = oku();
  const hedef = notlar.find(n => n.id === id);
  if (!hedef) return false;

  hedef.baslik = yeniVeri.baslik || hedef.baslik;
  hedef.icerik = yeniVeri.icerik || hedef.icerik;
  hedef.etiket = yeniVeri.etiket || hedef.etiket;
  yaz(notlar);
  return true;
}


// Ara
function ara(kelime) {
  const notlar = oku();
  const sonuc = notlar.filter(n =>
    n.baslik.includes(kelime) || n.icerik.includes(kelime)
  );
  if (sonuc.length === 0) return console.log('🔍 Sonuç bulunamadı.');
  sonuc.forEach((not, i) => {
    console.log(`${i + 1}. [${not.id}] ${not.baslik} - ${not.icerik}`);
  });
}

module.exports = { ekle, listele, sil, sabitle, ara , guncelle};
    