const { ekle, listele, sil, sabitle, ara } = require('./notes');

const [,, komut, ...argumanlar] = process.argv;

switch (komut) {
  case 'ekle':
    ekle(argumanlar[0], argumanlar[1], argumanlar[2] || '');
    break;
  case 'listele':
    listele(argumanlar[0]); // etiket filtre opsiyonel
    break;
  case 'sil':
    sil(argumanlar[0]); // id
    break;
  case 'sabitle':
    sabitle(argumanlar[0]); // id
    break;
  case 'ara':
    ara(argumanlar[0]); // kelime
    break;
  default:
    console.log(`
Kullanım:
  node app.js ekle <başlık> <içerik> [etiket]
  node app.js listele [etiket]
  node app.js sil <id>
  node app.js sabitle <id>
  node app.js ara <kelime>
    `);
}
