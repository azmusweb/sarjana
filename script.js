const sheetId = '1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU';
const configURL = `https://opensheet.elk.sh/${sheetId}/CONFIG`;

async function loadConfig() {
  const res = await fetch(configURL);
  const data = await res.json();

  let menuList = [];
  let subMenuMap = {};
  let logoUrl = '';
  let socialLinks = {
    facebook: '#',
    twitter: '#',
    youtube: '#',
    instagram: '#'
  };

  data.forEach(row => {
    switch (row.FUNGSI) {
      case 'menu':
        menuList = row.WEBSITE.split(',').map(m => m.trim());
        break;
      case 'sub-menu':
        row.WEBSITE.split(',').forEach(item => {
          const [parent, child] = item.split('>').map(i => i.trim());
          if (!subMenuMap[parent]) subMenuMap[parent] = [];
          subMenuMap[parent].push(child);
        });
        break;
      case 'logo':
        logoUrl = row.WEBSITE;
        break;
      case 'facebook':
        socialLinks.facebook = row.WEBSITE;
        break;
      case 'twitter':
        socialLinks.twitter = row.WEBSITE;
        break;
      case 'youtube':
        socialLinks.youtube = row.WEBSITE;
        break;
      case 'instagram':
        socialLinks.instagram = row.WEBSITE;
        break;
    }
  });

  // Pasang logo
  document.getElementById('logo').src = logoUrl;

  // Buat menu dinamis
  const nav = document.getElementById('nav-menu');
  menuList.forEach(menu => {
    if (subMenuMap[menu]) {
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown';
      dropdown.innerHTML = `
        <button class="dropbtn">${menu}</button>
        <div class="dropdown-content">
          ${subMenuMap[menu].map(sub => `<a href="#">${sub}</a>`).join('')}
        </div>
      `;
      nav.appendChild(dropdown);
    } else {
      const link = document.createElement('a');
      link.href = "#";
      link.textContent = menu;
      nav.appendChild(link);
    }
  });

  // Pasang link medsos
  document.getElementById('fb').href = socialLinks.facebook;
  document.getElementById('tw').href = socialLinks.twitter;
  document.getElementById('yt').href = socialLinks.youtube;
  document.getElementById('ig').href = socialLinks.instagram;
}

loadConfig();
