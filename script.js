fetch('https://opensheet.elk.sh/1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU/berita')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('list-berita');
    data.reverse().forEach(item => {
      if (item.shown.toLowerCase() === 'ya') {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${item.Gambar}" alt="${item.Judul}">
          <h3><a href="berita.html?slug=${item.Slug}">${item.Judul}</a></h3>
          <p>${item['Meta Deskripsi']}</p>
        `;
        container.appendChild(card);
      }
    });
  });