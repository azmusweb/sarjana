const sheetId = '1oMHeKOF2_D6deuV8T1l10_GB0wgsPGLV7WrPcJ6Qxww';
const configURL = `https://opensheet.elk.sh/${sheetId}/CONFIG`;
const menuURL = `https://opensheet.elk.sh/${sheetId}/MENU`;

async function loadConfig() {
  const [configRes, menuRes] = await Promise.all([
    fetch(configURL),
    fetch(menuURL)
  ]);

  const configData = await configRes.json();
  const menuData = await menuRes.json();

  // Pasang logo
  const configMap = {};
  configData.forEach(item => {
    configMap[item.FUNGSI] = item.WEBSITE;
  });
  document.getElementById('logo').src = configMap['logo'];
  document.getElementById('fb').href = configMap['facebook'];
  document.getElementById('tw').href = configMap['twitter'];
  document.getElementById('yt').href = configMap['youtube'];
  document.getElementById('ig').href = configMap['instagram'];

  // Buat menu & sub-menu
  const menuMap = {};
  const parentMenus = [];

  menuData.forEach(item => {
    const name = item['Nama Menu'].trim();
    const slug = item['Slug'].trim();
    const parent = item['Parent']?.trim();
    if (!parent) {
      parentMenus.push({ name, slug });
    } else {
      if (!menuMap[parent]) menuMap[parent] = [];
      menuMap[parent].push({ name, slug });
    }
  });

  const nav = document.getElementById('nav-menu');
  parentMenus.forEach(menu => {
    if (menuMap[menu.name]) {
      const wrapper = document.createElement('div');
      wrapper.className = 'dropdown3D';
      wrapper.innerHTML = `
        <a class="menu-main" href="${menu.slug}">${menu.name}</a>
        <div class="dropdown-content3D">
          ${menuMap[menu.name].map(sub => `<a href="${sub.slug}">${sub.name}</a>`).join('')}
        </div>
      `;
      nav.appendChild(wrapper);
    } else {
      const link = document.createElement('a');
      link.href = menu.slug;
      link.className = 'menu-main';
      link.textContent = menu.name;
      nav.appendChild(link);
    }
  });
}

loadConfig();
