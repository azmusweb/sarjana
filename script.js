const spreadsheetID = '128bSvr13vEVS2jKM_f7rFJd7WYit59FwSjKGAe3zCeE';
const sheetName = 'Live Website';
const sheetConfig = 'CONFIG';

async function ambilData(sheet) {
  const url = `https://opensheet.elk.sh/${spreadsheetID}/${sheet}`;
  const res = await fetch(url);
  return await res.json();
}

function buatMenu(navigasiString) {
  const menuContainer = document.getElementById('menu-navigasi');
  const items = navigasiString.split(',');
  menuContainer.innerHTML = items.map(item => {
    const [label, link] = item.split('|').map(el => el.trim());
    return `<a href="${link}">${label}</a>`;
  }).join('');
}

function buatBerita(beritaList) {
  const konten = document.getElementById('daftar-berita');
  konten.innerHTML = beritaList.map(berita => `
    <article>
      <h2>${berita['Judul']}</h2>
      <img src="${berita['Gambar']}" alt="${berita['Judul']}" style="max-width:100%;" />
      <p>${berita['Body'].substring(0, 150)}...</p>
      <a href="${berita['Slug + PermaLink']}">Selengkapnya</a>
    </article>
  `).join('');
}

function tampilkanTicker(beritaList) {
  const ticker = document.getElementById('bilah-berita');
  const judulList = beritaList.slice(0, 10).map(b => b['Judul']).join(' | ');
  ticker.innerText = judulList;
}

async function mulai() {
  const config = await ambilData(sheetConfig);
  const pengaturan = {};
  config.forEach(row => pengaturan[row['FUNGSI']] = row['WEBSITE'] || row['BLOG']);
  if (pengaturan['menu-navigasi']) buatMenu(pengaturan['menu-navigasi']);
  const berita = await ambilData(sheetName);
  buatBerita(berita);
  tampilkanTicker(berita);
}

document.addEventListener("DOMContentLoaded", mulai);