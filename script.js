const sheetId = '1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU';
const configURL = `https://opensheet.elk.sh/${sheetId}/CONFIG`;
const menuURL = `https://opensheet.elk.sh/${sheetId}/MENU`;

async function loadConfig() {
  const [configRes, menuRes] = await Promise.all([
    fetch(configURL),
    fetch(menuURL)
  ]);

  const configData = await configRes.json();
  const menuData = await menuRes.json();

  // Konfigurasi umum
  const configMap = {};
  configData.forEach(row => {
    configMap[row.FUNGSI] = row.WEBSITE;
  });

  // Pasang logo
  document.getElementById('logo').src = configMap['logo'];

  // Media sosial
  document.getElementById('fb').href = configMap['facebook'] || '#';
  document.getElementById('tw').href = configMap['twitter'] || '#';
  document.getElementById('yt').href = configMap['youtube'] || '#';
  document.getElementById('ig').href = configMap['instagram'] || '#';

  // Bangun struktur menu
  const menuMap = {};
  const parentMenus = [];

  menuData.forEach(row => {
    const name = row['Nama Menu'].trim();
    const slug = row['Slug'].trim();
    const parent = row['Parent']?.trim();

    if (!parent) {
      parentMenus.push({ name, slug });
    } else {
      if (!menuMap[parent]) menuMap[parent] = [];
      menuMap[parent].push({ name, slug });
    }
  });

  // Render menu
  const nav = document.getElementById('nav-menu');
  parentMenus.forEach(menu => {
    if (menuMap[menu.name]) {
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown3D';
      dropdown.innerHTML = `
        <a class="menu-main" href="${menu.slug}">${menu.name}</a>
        <div class="dropdown-content3D">
          ${menuMap[menu.name].map(sub => `<a href="${sub.slug}">${sub.name}</a>`).join('')}
        </div>
      `;
      nav.appendChild(dropdown);
    } else {
      const link = document.createElement('a');
      link.href = menu.slug;
      link.textContent = menu.name;
      link.className = 'menu-main';
      nav.appendChild(link);
    }
  });
}

loadConfig();
