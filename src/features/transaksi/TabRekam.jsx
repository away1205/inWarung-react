function TabRekam({ children }) {
  return (
    <div className='shadow-sm py-2 pt-3' id='kontenTabTransaksi'>
      <div className='row' id='home' role='tabpanel' aria-labelledby='home-tab'>
        <div className='row' style={{ paddingRight: '8rem' }}>
          <div className='col-9'>
            <p style={{ fontSize: '13px', color: 'grey' }}>
              Petunjuk penggunaan : <br />
              1. Tekan tombol{' '}
              <img
                src='assets/voice.png'
                alt='Rekam'
                style={{ height: '15px' }}
              />{' '}
              untuk merekam semua barang yang dibeli. <br />
              2. Sebutkan nama semua barang yang dibeli. <br />
              3. Ketika selesai, tekan tombol{' '}
              <img
                src='assets/stop.png'
                alt='Stop'
                style={{ height: '15px' }}
              />{' '}
              <br />
              4. Jika diperlukan, Anda dapat memutar ulang rekaman suara. <br />
              5. Sesuaikan kuantitas barang yang dibeli pada tabel Daftar Barang
              dalam Transaksi di bawah ini.
            </p>
          </div>

          <div className='col-3 d-flex align-items-center'>
            <div className='row'>
              {children}
              {/* <RecorderRealTime /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabRekam;
