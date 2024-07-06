import { Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useKategori from '../hooks/useKategori';
import useSpecificBarang from '../hooks/useSpecificBarang';
import { useParams } from 'react-router-dom';
import StokBarang from '../features/inventaris/StokBarang';
import useUpdateBarang from '../hooks/useUpdateBarang';

function DetailBarang() {
  const { register, handleSubmit } = useForm();
  const { kategori, isPending: isPendingKategori } = useKategori();
  const { id_product } = useParams();
  const { barang, isPending: isPendingBarang } = useSpecificBarang(id_product);
  const { updateBarang, isUpdating } = useUpdateBarang();

  function onUpdate(data) {
    updateBarang(id_product, data);
  }

  return (
    <div className='home-content py-3 h-100'>
      <div className='row mt-4'>
        <div className='judul col-10'>
          <h1>Detail Barang</h1>
        </div>
      </div>
      <div className='table-container p-5 mt-3'>
        <div>
          {isPendingBarang || isPendingKategori ? (
            <Spinner size='xl' />
          ) : (
            <Form onSubmit={handleSubmit(onUpdate)}>
              <Form.Label htmlFor='product_name'>Nama Barang</Form.Label>
              <Form.Control
                id='product_name'
                {...register('product_name', {
                  required: 'Baris ini harus diisi',
                  value: barang.product_name,
                })}
              />
              <Form.Label htmlFor='id_category'>Kategori</Form.Label>
              <Form.Select
                id='id_category'
                {...register('id_category', {
                  required: 'Baris ini harus diisi',
                  value: barang.id_category,
                })}
                disabled={isPendingKategori}
                aria-label='Pilih kategori'
                // defaultValue={barang[0]?.id_category}
              >
                <option>Pilih kategori barang</option>
                {kategori?.map((item) => {
                  return (
                    <option value={item.id_category} key={item.id_category}>
                      {item?.category_name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Label htmlFor='current_stock'>Stock Sekarang</Form.Label>
              <Form.Control
                id='retail_price'
                {...register('current_stock', {
                  required: 'Baris ini harus diisi',
                  value: barang.current_stock,
                })}
                disabled={false}
                type='number'
              />

              <div className='d-flex mt-4 gap-2 justify-content-end'>
                <Button variant='outline-danger'>Delete</Button>
                <Button variant='outline-primary' type='submit'>
                  Save
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>

      <StokBarang />
    </div>
  );
}

export default DetailBarang;
