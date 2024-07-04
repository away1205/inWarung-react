import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Sidebar from '../ui/Sidebar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import TabelTransaksi from '../features/transaksi/TabelTransaksi';
import Button from 'react-bootstrap/esm/Button';
import useBarang from '../hooks/useBarang';
import AudioRecorder from '../features/transaksi/Recorder';

function Transaksi() {
  const { barang, isPending, error } = useBarang();
  const [listBarang, setListBarang] = useState([]);

  const { handleSubmit, register } = useForm();

  function handleAddTransaction(data) {
    const [selectedBarang] = barang.filter(
      (item) => item.id_product === Number(data.id_product)
    );

    setListBarang((cur) => [
      ...cur,
      {
        ...selectedBarang,
        qty: 1,
      },
    ]);

    console.log(listBarang);
  }
  return (
    <div>
      <Sidebar />

      <div className='home-content py-3 h-100'>
        <div className='row mt-4'>
          <div className='judul col-9'>
            <h1>Transaksi Baru</h1>
          </div>
        </div>
        <div
          className='table-container shadow-sm p-3 pb-4 mt-3'
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <div className='col-12 mt-2 mb-2'>
            <Tabs>
              <Tab eventKey={'rekam'} title='Rekam Barang'>
                <div
                  className='tab-content shadow-sm py-2 pt-3'
                  id='kontenTabTransaksi'
                >
                  <div
                    className='tab-pane fade show active row'
                    id='home'
                    role='tabpanel'
                    aria-labelledby='home-tab'
                  >
                    <div className='row'>
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
                          4. Jika diperlukan, Anda dapat memutar ulang rekaman
                          suara. <br />
                          5. Sesuaikan kuantitas barang yang dibeli pada tabel
                          Daftar Barang dalam Transaksi di bawah ini.
                        </p>
                      </div>

                      <div className='col-3 d-flex align-items-center'>
                        <div className='row '>
                          <AudioRecorder />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey={'pilih'} title='Pilih Barang'>
                <div id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                  <div className='row'>
                    <div className='col-12 mt-4'>
                      <div className='form-group p-0'>
                        <div className='row'>
                          <div className='col-12 d-flex align-items-center '>
                            <p className='m-0'>Pilih barang yang dibeli</p>
                          </div>
                          <Form onSubmit={handleSubmit(handleAddTransaction)}>
                            <div className='col-12 mt-3 d-flex gap-4'>
                              <Form.Select
                                className='form-select form-control'
                                id='listProduct'
                                aria-label='Default select example'
                                name='id_tag'
                                style={{ width: '100%', height: '38px' }}
                                {...register('id_product', {
                                  required: 'Baris ini harus diisi',
                                })}
                              >
                                {barang?.map((item) => {
                                  return (
                                    <option
                                      value={item.id_product}
                                      key={item.id_product}
                                    >
                                      {item.product_name}
                                    </option>
                                  );
                                })}
                              </Form.Select>

                              <Button type='submit'>Tambah</Button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>

        <TabelTransaksi
          listTransaksi={listBarang}
          onListTransaksi={setListBarang}
        />
      </div>
    </div>
  );
}

export default Transaksi;
