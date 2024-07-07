import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import TabelTransaksi from '../features/transaksi/TabelTransaksi';
import useBarang from '../hooks/useBarang';
import TabRekam from '../features/transaksi/TabRekam';
import usePostTransactionGPT from '../hooks/usePostTransactionGPT';
import AudioRecorder from '../features/transaksi/Recorder';
import { Spinner } from 'react-bootstrap';
import { useTransactionGPT } from '../hooks/useTransaction';

function Transaksi() {
  const { barang, isPending } = useBarang();
  const [listBarang, setListBarang] = useState([]);
  const [transcription, setTranscription] = useState([]);
  const { handleSubmit, register } = useForm();

  const { postTransactionGPT, isPending: isPendingGPT } =
    usePostTransactionGPT();

  const { transaction } = useTransactionGPT();

  function handleAddTransaction(data) {
    const [selectedBarang] = barang.filter(
      (item) => item.id_product == data.id_product
    );

    setListBarang((cur) => [
      ...cur,
      {
        ...selectedBarang,
        qty: 1,
      },
    ]);
  }

  return (
    <div>
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
                <TabRekam>
                  <AudioRecorder
                    onListBarang={setListBarang}
                    onTranscription={setTranscription}
                    onTransactionGPT={postTransactionGPT}
                    transcription={transcription}
                  />
                </TabRekam>
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
                                <option value=''>Pilih barang</option>
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

          {transcription.length > 0 && (
            <div
              className='mt-4 px-2 pt-2 pb-2'
              style={{ borderRadius: '0.6rem', backgroundColor: '#fff' }}
            >
              <h6>Transkripsi :</h6>
              <p>
                {transcription?.map((item, i) => (
                  <span key={i}>{item} </span>
                ))}
              </p>
            </div>
          )}
        </div>

        {listBarang.length >= 1 && (
          <TabelTransaksi
            listTransaksi={listBarang}
            onListTransaksi={setListBarang}
            transcription={transcription}
            onTranscription={setTranscription}
          />
        )}

        {isPendingGPT && (
          <div
            className='d-flex justify-content-center'
            style={{ marginTop: '3rem' }}
          >
            <Spinner size='xl' />
          </div>
        )}
      </div>
    </div>
  );
}

export default Transaksi;
