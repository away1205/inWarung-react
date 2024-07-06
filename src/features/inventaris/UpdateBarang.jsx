import { Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import useSpecificBarang from '../../hooks/useSpecificBarang';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateBarang from '../../hooks/useUpdateBarang';
import useKategori from '../../hooks/useKategori';
import { useState } from 'react';
import useDeleteBarang from '../../hooks/useDeleteBarang';

function UpdateBarang() {
  const { register, handleSubmit } = useForm();
  const { kategori, isPending: isPendingKategori } = useKategori();
  const { id_product } = useParams();
  const { barang, isPending: isPendingBarang } = useSpecificBarang(id_product);
  const { updateBarang, isUpdating } = useUpdateBarang();
  const { deleteBarang } = useDeleteBarang();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  function onUpdate(data) {
    const updatedBarang = { ...barang, ...data };
    console.log(updatedBarang);
    updateBarang(
      { id: id_product, data: updatedBarang },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
      }
    );
  }

  function onDelete() {
    deleteBarang(id_product, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  }

  return (
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
            disabled={!isEdit}
          />
          <Form.Label htmlFor='id_category'>Kategori</Form.Label>
          <Form.Select
            id='id_category'
            {...register('id_category', {
              required: 'Baris ini harus diisi',
              value: barang.id_category,
            })}
            disabled={isPendingKategori || !isEdit}
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
            disabled={!isEdit}
            type='number'
          />

          <div className='d-flex mt-4 gap-2 justify-content-end'>
            {isEdit ? (
              <>
                <Button variant='outline-danger' onClick={onDelete}>
                  Delete
                </Button>
                <Button variant='outline-primary' type='submit'>
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant='outline-primary'
                onClick={() => setIsEdit((cur) => !cur)}
              >
                Edit
              </Button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
}

export default UpdateBarang;
