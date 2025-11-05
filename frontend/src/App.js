import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [notlar, setNotlar] = useState([]);
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [etiket, setEtiket] = useState('');
  const [duzenlemeId, setDuzenlemeId] = useState(null);
  const [duzenlemeBaslik, setDuzenlemeBaslik] = useState('');
  const [duzenlemeIcerik, setDuzenlemeIcerik] = useState('');
  const [duzenlemeEtiket, setDuzenlemeEtiket] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/notes')
      .then(res => setNotlar(res.data));
  }, []);

  const notEkle = () => {
    axios.post('http://localhost:3001/api/notes', { baslik, icerik, etiket })
      .then(() => {
        setBaslik('');
        setIcerik('');
        setEtiket('');
        axios.get('http://localhost:3001/api/notes')
          .then(res => setNotlar(res.data));
      });
  };

  const notSil = (id) => {
    axios.delete(`http://localhost:3001/api/notes/${id}`)
      .then(() => {
        setNotlar(notlar.filter(n => n.id !== id));
      });
  };

  const duzenlemeyiBaslat = (not) => {
    setDuzenlemeId(not.id);
    setDuzenlemeBaslik(not.baslik);
    setDuzenlemeIcerik(not.icerik);
    setDuzenlemeEtiket(not.etiket);
  };

  const notuGuncelle = () => {
    axios.put(`http://localhost:3001/api/notes/${duzenlemeId}`, {
      baslik: duzenlemeBaslik,
      icerik: duzenlemeIcerik,
      etiket: duzenlemeEtiket
    }).then(() => {
      setDuzenlemeId(null);
      axios.get('http://localhost:3001/api/notes')
        .then(res => setNotlar(res.data));
    });
  };

  const formatTarih = (isoString) => {
  const tarih = new Date(isoString);
  const gun = String(tarih.getDate()).padStart(2, '0');
  const ay = String(tarih.getMonth() + 1).padStart(2, '0');
  const yil = tarih.getFullYear();
  return `${gun}-${ay}-${yil}`;
};

 return (
  <div className="container">
    <h2>Not Uygulaması</h2>

    <input placeholder="Başlık" value={baslik} onChange={e => setBaslik(e.target.value)} />
    <input placeholder="İçerik" value={icerik} onChange={e => setIcerik(e.target.value)} />
    <input placeholder="Etiket" value={etiket} onChange={e => setEtiket(e.target.value)} />
    <button onClick={notEkle}>Ekle</button>

    <hr />

    <ul>
      {notlar.map(not => (
        <li key={not.id}>
          <strong>{not.baslik}</strong> ({not.etiket})<br />
          {not.icerik}<br />
          <em>{formatTarih(not.tarih)}</em><br />

          <button onClick={() => notSil(not.id)}>Sil</button>
          <button onClick={() => duzenlemeyiBaslat(not)}>Düzenle</button>
          <hr />
        </li>
      ))}
    </ul>

    {duzenlemeId && (
      <div>
        <h4>Notu Düzenle</h4>
        <input value={duzenlemeBaslik} onChange={e => setDuzenlemeBaslik(e.target.value)} />
        <input value={duzenlemeIcerik} onChange={e => setDuzenlemeIcerik(e.target.value)} />
        <input value={duzenlemeEtiket} onChange={e => setDuzenlemeEtiket(e.target.value)} />
        <button onClick={notuGuncelle}>Kaydet</button>
      </div>
    )}
  </div>
);
}

export default App;
