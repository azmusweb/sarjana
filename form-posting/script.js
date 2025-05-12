document.getElementById('posting-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Ambil data dari form
  const judul = document.getElementById('judul').value;
  const label = document.getElementById('label').value;
  const gambar = document.getElementById('gambar').value;
  const slug = document.getElementById('slug').value;
  const metaDeskripsi = document.getElementById('meta-deskripsi').value;
  const body = document.getElementById('body').value;
  const type = document.getElementById('type').value;

  // Menyusun data dalam format JSON
  const data = {
    "Judul": judul,
    "Label": label,
    "Gambar": gambar,
    "Slug": slug,
    "Meta Deskripsi": metaDeskripsi,
    "Body": body,
    "Type": type,
    "View": 0,
    "Tgl/Jam": new Date().toISOString()
  };

  // Mengirim data ke Google Spreadsheet via Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbydAyxAaGHxF2AY6JWg7bChAh0ZptfjMkdE3ft_8SbZmD5Ff2lFht_KFUpu8vwnczEX/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    alert('Berita berhasil dikirim!');
    // Clear form after submit
    document.getElementById('posting-form').reset();
  })
  .catch(error => {
    alert('Terjadi kesalahan! Coba lagi nanti.');
    console.error('Error:', error);
  });
});
