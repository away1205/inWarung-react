import StokBarang from '../features/inventaris/StokBarang';
import UpdateBarang from '../features/inventaris/UpdateBarang';

function DetailBarang() {
  return (
    <div className='home-content py-3 h-100'>
      <div className='row mt-4'>
        <div className='judul col-10'>
          <h1>Detail Barang</h1>
        </div>
      </div>
      <div className='table-container p-5 mt-3'>
        <UpdateBarang />
      </div>

      <StokBarang />
    </div>
  );
}

export default DetailBarang;
