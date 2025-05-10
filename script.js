const SHEET_URL = 'https://opensheet.elk.sh/1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU/LIVE%20WEBSITE';

fetch(SHEET_URL)
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById('berita-container');
    data.forEach((item) => {
      if (item.Type === 'utama') {
        const card = document.createElement('div');
        card.className = 'berita-card';
        card.innerHTML = `
          <a href="berita.html?slug=${item.Slug}">
            <img src="${item.Gambar}" alt="${item.Judul}" style="width:100%; max-height:200px; object-fit:cover;" />
            <h2>${item.Judul}</h2>
            <p>${item.Label} - ${item.Tanggal}</p>
          </a>
        `;
        container.appendChild(card);
      }
    });
  })
  .catch((error) => {
    console.error('Gagal mengambil data:', error);
  });
