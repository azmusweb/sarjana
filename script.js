fetch("https://opensheet.elk.sh/1XT4Sd6_VbjaliOGy3hGiKPoePusGrHj6w0b7U5ZKABU/CONFIG")
  .then(res => res.json())
  .then(data => {
    const config = {};

    // Ubah array config ke objek: { fungsi: nilai }
    data.forEach(item => {
      const key = item["FUNGSI"]?.toLowerCase().trim().replace(/\s+/g, "-");
      const value = item["WEBSITE"]?.trim();
      if (key && value) {
        config[key] = value;
      }
    });

    // Contoh penggunaan:
    document.body.style.backgroundColor = config["warna-backround-body"] || "#fff";
    document.body.style.color = config["warna-text"] || "#000";
    document.body.style.fontFamily = "sans-serif";

    const header = document.querySelector("header");
    if (header) {
      header.style.backgroundColor = config["warna-background-navigasi"] || "#eee";
      header.style.color = config["warna-text-link"] || "#000";
    }

    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.backgroundColor = config["warna-backround-footer"] || "#000";
      footer.style.color = config["warna-text-footer"] || "#fff";
      footer.innerText = config["copyright-credit"] || "";
    }

    // Tambah favicon jika ada
    if (config["favicon-link"]) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = config["favicon-link"];
      document.head.appendChild(link);
    }

    // Tampilkan logo jika ON
    if (config["logo-website"] === "ON" && config["link-logo-gambar-website"]) {
      const logo = document.getElementById("logo-website");
      if (logo) {
        logo.src = config["link-logo-gambar-website"];
        logo.alt = config["logo-hanya-text"] || "Logo";
      }
    }

    // TODO: Tambahkan bagian lain seperti menu, slug, dll.
    console.log("Konfigurasi berhasil dimuat:", config);
  })
  .catch(err => {
    console.error("Gagal mengambil data CONFIG:", err);
  });
