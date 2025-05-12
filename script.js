const SPREADSHEET_ID = '1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU';
const CONFIG_TAB = 'CONFIG';
const BERITA_TAB = 'Live Website';

const API_URL = `https://opensheet.elk.sh/${1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU}/`;

async function fetchSheetData(tab) {
  const res = await fetch(API_URL + tab);
  return res.json();
}

function applyConfig(config) {
  const configMap = {};
  config.forEach(row => {
    const key = row["FUNGSI WEBSITE"]?.trim().toLowerCase().replace(/\s+/g, '-');
    configMap[key] = row["BLOG"];
  });

  if (configMap["logo-hanya-text"]) {
    document.getElementById('logo-text').textContent = configMap["logo-hanya-text"];
  }
  if (configMap["link-logo-gambar-website"]) {
    document.getElementById('logo-img').src = configMap["link-logo-gambar-website"];
  }
  if (configMap["menu-navigasi"]) {
    const menuList = configMap["menu-navigasi"].split(',');
    const menuEl = document.getElementById("menu-navigasi");
    menuList.forEach(item => {
      const [label, url] = item.split('|').map(i => i.trim());
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.textContent = label;
      li.appendChild(a);
      menuEl.appendChild(li);
    });
  }
  if (configMap["warna-utama"]) {
    document.documentElement.style.setProperty('--warna-utama', configMap["warna-utama"]);
  }
  if (configMap["warna-text"]) {
    document.documentElement.style.setProperty('--warna-text', configMap["warna-text"]);
  }
  if (configMap["copyright-credit"]) {
    document.getElementById('footer-text').textContent = configMap["copyright-credit"];
  }
}

async function tampilkanBerita() {
  const data = await fetchSheetData(BERITA_TAB);
  const container = document.getElementById("daftar-berita");
  if (!container) return;
  container.innerHTML = "";

  data.forEach(row => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h2><a href="berita.html?slug=${row["Slug + PermaLink"]}">${row["Judul"]}</a></h2>
      <img src="${row["Gambar"]}" alt="${row["Judul"]}" style="max-width:100%;" />
      <p>${row["Body"].substring(0, 120)}...</p>
    `;
    container.appendChild(card);
  });
}

async function tampilkanBeritaDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  if (!slug) return;

  const data = await fetchSheetData(BERITA_TAB);
  const berita = data.find(row => row["Slug + PermaLink"] === slug);
  if (!berita) return;

  const konten = document.getElementById("konten-berita");
  konten.innerHTML = `
    <h1>${berita["Judul"]}</h1>
    <img src="${berita["Gambar"]}" alt="${berita["Judul"]}" style="max-width:100%;" />
    <p>${berita["Body"]}</p>
  `;
}

(async () => {
  const config = await fetchSheetData(CONFIG_TAB);
  applyConfig(config);

  if (document.getElementById("daftar-berita")) tampilkanBerita();
  if (document.getElementById("konten-berita")) tampilkanBeritaDetail();
})();
