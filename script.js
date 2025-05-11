const SPREADSHEET_ID = "1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU";
const CONFIG_SHEET = "CONFIG";
const BERITA_SHEET = "berita";

async function fetchSheet(sheetName) {
  const url = `https://opensheet.elk.sh/${SPREADSHEET_ID}/${sheetName}`;
  const res = await fetch(url);
  return res.json();
}

function getConfigValue(configs, key) {
  const item = configs.find(i => i["FUNGSI WEBSITE"] === key);
  return item ? item["BLOG"] : null;
}

async function loadConfig() {
  const configs = await fetchSheet(CONFIG_SHEET);

  document.title = getConfigValue(configs, "meta-title-home") || "Website";
  document.getElementById("favicon").href = getConfigValue(configs, "favicon-link") || "";
  document.getElementById("site-description").content = getConfigValue(configs, "meta-deskripsi-home") || "";

  document.body.style.backgroundColor = getConfigValue(configs, "warna-backround-body") || "#ffffff";
  document.body.style.color = getConfigValue(configs, "warna-text") || "#000000";
  document.getElementById("logo").src = getConfigValue(configs, "link-logo-gambar-website") || "";
  document.getElementById("logo-text").innerText = getConfigValue(configs, "logo-hanya-text") || "LOGO";

  document.getElementById("copyright").innerText =
    getConfigValue(configs, "copyright-credit") || "© 2025";

  // Buat menu navigasi
  const navHTML = (getConfigValue(configs, "menu-navigasi") || "")
    .split(",")
    .map(item => {
      const [label, url] = item.trim().split("|");
      return `<a href="${url.trim()}">${label.trim()}</a>`;
    }).join("");
  document.getElementById("menu-nav").innerHTML = navHTML;
}

async function loadNews() {
  const newsData = await fetchSheet(BERITA_SHEET);
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  newsData.filter(news => news["Status View"] === "ON").forEach(news => {
    const html = `
      <div class="news-card">
        <h2>${news["Judul"]}</h2>
        <img src="${news["Gambar"]}" alt="${news["Judul"]}" />
        <p>${news["Isi"].substring(0, 150)}...</p>
        <a href="/berita/${news["Slug"]}" class="read-more">Selengkapnya</a>
      </div>
    `;
    container.innerHTML += html;
  });
}

loadConfig();
loadNews();
