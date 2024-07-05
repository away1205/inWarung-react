import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import useTambahBarang from '../../hooks/useTambahBarang';
import useKategori from '../../hooks/useKategori';
import DaftarBarang from './DaftarBarang';

function DaftarInventarisContent() {
  const [show, setShow] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { tambahBarang, isCreating } = useTambahBarang();
  const { kategori, isPending } = useKategori();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onSubmit(data) {
    // const productData = {
    //   product_name: 'MAqua',
    //   id_category: 1,
    //   retail_price: 10000,
    //   wholesale_price: 12000,
    // };

    console.log(data);

    // tambahBarang(productData, {
    //   onSuccess: () => {
    //     handleClose();
    //     reset();
    //   },
    // });
  }

  return (
    <div className='home-content py-3 h-100'>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label htmlFor='product_name'>Nama</Form.Label>
            <Form.Control
              id='product_name'
              {...register('product_name', {
                required: 'Baris ini harus diisi',
              })}
              disabled={isCreating}
            />
            <Form.Label htmlFor='id_category'>Kategori</Form.Label>
            <Form.Select
              id='id_category'
              {...register('id_category', {
                required: 'Baris ini harus diisi',
              })}
              disabled={isCreating || isPending}
              aria-label='Pilih kategori'
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
            <Form.Label htmlFor='wholesale_Price'>Harga grosir</Form.Label>
            <Form.Control
              id='wholesale_Price'
              {...register('wholesale_price', {
                required: 'Baris ini harus diisi',
              })}
              disabled={isCreating}
              type='number'
            />
            <Form.Label htmlFor='retail_price'>Harga retail</Form.Label>
            <Form.Control
              id='retail_price'
              {...register('retail_price', {
                required: 'Baris ini harus diisi',
              })}
              disabled={isCreating}
              type='number'
            />
            <Form.Label htmlFor='current_stock'>Stock Sekarang</Form.Label>
            <Form.Control
              id='retail_price'
              {...register('current_stock', {
                required: 'Baris ini harus diisi',
              })}
              disabled={isCreating}
              type='number'
            />

            <Form.Group className='d-flex mt-4 gap-2 justify-content-end'>
              <Button variant='secondary' onClick={handleClose}>
                Batalkan
              </Button>
              <Button variant='primary' type='submit'>
                Tambahkan
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <div className='row mt-4'>
        <div className='judul col-9'>
          <h1>Daftar Barang</h1>
        </div>

        <div className='d-flex justify-content-end col-3'>
          <button
            type='button'
            className='btn btn-primary'
            id='btn-modal'
            onClick={handleShow}
            disabled={isPending && true}
          >
            Tambah Barang
          </button>
        </div>
      </div>

      <DaftarBarang />
    </div>
  );
}

export default DaftarInventarisContent;
