import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import useTambahBarang from '../../hooks/useTambahBarang';

function DaftarInventarisContent() {
  const [show, setShow] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { tambahBarang, isCreating } = useTambahBarang();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onSubmit(data) {
    const productData = {
      product_name: 'MAqua',
      id_category: 1,
      retail_price: 10000,
      wholesale_price: 12000,
    };

    tambahBarang(productData, {
      onSuccess: () => {
        handleClose();
        reset();
      },
    });
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
            <Form.Control
              id='id_category'
              {...register('id_category', {
                required: 'Baris ini harus diisi',
              })}
              disabled={isCreating}
            />
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
              {...register('retail_price', {
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
          >
            Tambah Barang
          </button>
        </div>
      </div>

      {/* <div className='table-container p-5 mt-3 shadow-sm'>
        <table id='tabelBarang' className='table' style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td></td>
              <div className='row actions'>
                <div className='search-btn col px-0'>
                  <a href='detail-barang.html'>
                    <button
                      type='button'
                      className='btn btn-primary px-0'
                      data-toggle='modal'
                      data-target='#editModal'
                      style={{
                        backgroundColor: 'transparent',
                        color: 'gray',
                        border: 'none',
                      }}
                    >
                      <i className='bi bi-search'></i>
                    </button>
                  </a>
                </div>
                <div className='del-btn col px-0'>
                  <button
                    type='button'
                    className='btn btn-primary px-0'
                    data-toggle='modal'
                    data-target='#deleteModal'
                    style={{
                      backgroundColor: 'transparent',
                      color: 'gray',
                      border: 'none',
                    }}
                    id='buttonHapus'
                    data-id='{{row[1]}}'
                  >
                    <img src='assets/del.png' style={{ height: '20px' }} />
                  </button>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default DaftarInventarisContent;
