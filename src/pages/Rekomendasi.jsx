import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TabelTransaksi from '../features/transaksi/TabelTransaksi';
import useBarang from '../hooks/useBarang';
import LineChart from '../features/rekomendasi/LineChart';
import { MultiSelect } from 'react-multi-select-component';
import { ButtonGroup } from 'react-bootstrap';
import useForecastStock from '../hooks/useForecastStock';
import TableRekomendasi from '../features/rekomendasi/TableRekomendasi';

function Rekomendasi() {
  const { barang, isPending: isPendingBarang, error } = useBarang();
  const [optionBarang, setOptionBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState([]);
  const { forecastStock, isPending: isPendingForecast } = useForecastStock();
  const [dataToForecast, setDataToForecast] = useState();
  const [resultForecast, setResultForecast] = useState();

  const { handleSubmit, register, formState } = useForm();
  const { errors: formError } = formState;

  useEffect(() => {
    if (barang?.length > 0) {
      setOptionBarang(
        barang.map((item) => ({
          label: item.product_name,
          value: item.id_product,
        }))
      );
    }

    const product_ids = selectedBarang.map((item) => item.value);
    const forecastData = { product_ids };

    setDataToForecast(forecastData);
  }, [barang, selectedBarang]);

  // Function to handle adding transactions
  function handleSubmitForecast(data) {
    if (selectedBarang.length <= 0) return;

    forecastStock(
      { ...dataToForecast, day: Number(data.day) },
      { onSuccess: (data) => setResultForecast(data) }
    );
  }

  return (
    <div className='home-content py-3 h-100'>
      <div className='row mt-4'>
        <div className='judul col-9'>
          <h1>Rekomendasi Stok</h1>
        </div>
      </div>
      <div
        className='table-container shadow-sm row p-3 pt-4 mt-3'
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <div className='judul col-12'>
          <h5>Pilih Barang yang Diinginkan</h5>
        </div>
        <div className='col-12 mb-2'>
          <div className='form-group p-0'>
            <div className='row'>
              <Form onSubmit={handleSubmit(handleSubmitForecast)}>
                <div className='col-12 mt-3 d-flex gap-4 flex-column'>
                  <div style={{ width: '100%' }}>
                    <MultiSelect
                      value={selectedBarang}
                      onChange={(data) => {
                        setSelectedBarang(() => [...data]);
                      }}
                      options={optionBarang}
                      labelledBy='Pilih barang'
                    />
                  </div>

                  <div className='d-flex align-items-end gap-2'>
                    <div style={{ width: '100%' }}>
                      <Form.Label htmlFor='incoming_restock'>
                        Stok barang untuk berapa hari?
                      </Form.Label>
                      <Form.Control
                        id='incoming_restock'
                        {...register('day', {
                          required: 'Baris ini harus diisi',
                          min: { value: 2, message: 'Minimal 2 hari' },
                        })}
                        type='number' // Ensure input type is set correctly
                        defaultValue={2}
                      />

                      {formError?.day?.message && (
                        <div className='mt-2' style={{ color: 'red' }}>
                          {formError?.day?.message}
                        </div>
                      )}
                    </div>

                    {/* <ButtonGroup
                      className='d-flex gap-1'
                      style={{ height: 'min-content' }}
                    >
                      <Button
                        type='button'
                        size='sm'
                        onClick={() => handleDayForecast()}
                        disabled={selectedBarang.length === 0}
                      >
                        +
                      </Button>
                      <Button
                        type='button'
                        size='sm'
                        onClick={() => handleDayForecast(-1)}
                        disabled={
                          dayForecast <= 1 || selectedBarang.length === 0
                        }
                      >
                        -
                      </Button>
                    </ButtonGroup> */}
                  </div>

                  <Button type='submit'>Prediksi stok</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        {/* Grafik Sales */}
        {/* <div id="embeddedPageContainer" style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
          <iframe src="https://www.example.com/embedded-page.html" title="Embedded Page"></iframe>
        </div> */}
      </div>
      {/* hasil rekomendasi */}

      <div
        className='table-container shadow-sm row p-3 pt-4 mt-3'
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <h5>Hasil Rekomendasi</h5>

        <div className='col-12 mb-2'>
          <div className='form-group'>
            <div className='row'>
              {resultForecast === undefined ? (
                'Prediksi stok terlebih dahulu untuk melihat hasil rekomendasi'
              ) : (
                <TableRekomendasi resultForecast={resultForecast} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rekomendasi;
