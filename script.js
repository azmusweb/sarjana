fetch("https://opensheet.elk.sh/1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU/CONFIG")
  .then((res) => res.json())
  .then((config) => {
    // Ambil nilai dari kolom WEBSITE berdasarkan FUNGSI
    const getValue = (key) => {
      const item = config.find(row => row.FUNGSI === key);
      return item ? item.WEBSITE : null;
    };

    const judul = getValue("judul_website") || "Judul Website";
    const warna = getValue("warna_utama") || "#005f5f";
    const deskripsi = getValue("deskripsi_situs") || "";

    // Terapkan ke tampilan HTML
    const header = document.querySelector("header");
    if (header) {
      header.querySelector("h1").innerText = judul;
      header.style.backgroundColor = warna;

      if (deskripsi) {
        const desc = document.createElement("p");
        desc.innerText = deskripsi;
        desc.style.margin = "5px 0 0";
        desc.style.fontSize = "14px";
        desc.style.color = "#ddd";
        header.appendChild(desc);
      }
    }
  })
  .catch(err => {
    console.error("Gagal membaca konfigurasi CONFIG:", err);
  });
