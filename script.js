document.getElementById('downloadBtn').addEventListener('click', async () => {
    const url = document.getElementById('fileUrl').value; // Ubah ID input sesuai kebutuhan
    const resultDiv = document.getElementById('result');

    // Reset hasil sebelumnya
    resultDiv.innerHTML = '';

    if (!url) {
        toastr.error('URL tidak boleh kosong');
        return;
    }

    try {
        // Tampilkan pesan loading
        toastr.info('Memproses download...', { timeOut: 0 }); // Pesan loading tanpa timeout

        /*const response = await fetch('http://localhost:3000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });*/

        const result = await response.json();

        if (result.success) {
            // Jika download berhasil
            toastr.success('File berhasil diproses!');
            resultDiv.innerHTML = `
                <h2>Download Berhasil!</h2>
                <p>Nama File: ${result.data.filename}</p>
                <a href="${result.data.download_url}" download="${result.data.filename}">Download File</a>
            `;
        } else {
            // Jika download gagal
            toastr.error(result.error || 'Gagal memproses file');
            resultDiv.innerHTML = `
                <h2>Download Gagal</h2>
                <p>${result.error || 'Terjadi kesalahan saat memproses file.'}</p>
                <button id="retryBtn">Coba Lagi</button>
            `;

            // Tambahkan event listener untuk tombol "Coba Lagi"
            document.getElementById('retryBtn').addEventListener('click', () => {
                document.getElementById('downloadBtn').click(); // Trigger ulang proses download
            });
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Terjadi kesalahan saat memproses request');
        resultDiv.innerHTML = `
            <h2>Download Gagal</h2>
            <p>${error.message || 'Terjadi kesalahan jaringan atau server.'}</p>
            <button id="retryBtn">Coba Lagi</button>
        `;

        // Tambahkan event listener untuk tombol "Coba Lagi"
        document.getElementById('retryBtn').addEventListener('click', () => {
            document.getElementById('downloadBtn').click(); // Trigger ulang proses download
        });
    } finally {
        // Hapus pesan loading
        toastr.clear();
    }
});