import { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import useStok from '../../hooks/useStok';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import useTambahStok from '../../hooks/useTambahStok';
import { useForm } from 'react-hook-form';

function StokBarang() {
  const [show, setShow] = useState(false);
  const { id_product } = useParams();
  const { stok, isPending } = useStok(id_product);
  const { isCreating, tambahStok } = useTambahStok();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    const newStock = { ...data, id_product };
    tambahStok(
      newStock,

      {
        onSuccess: () => {
          setShow(false);
          reset();
        },
      }
    );
  }
  return (
    <>
      <div className='col-12 mt-5'>
        <div className='row'>
          <div className='col-11 judul-tabel'>
            <h6>Riwayat Penyetokan Barang</h6>
          </div>
          <div className='col-1 d-flex justify-content-end'>
            <Button onClick={() => setShow((cur) => !cur)}>+</Button>
          </div>
        </div>
      </div>
      <div className='col-12 mt-3'>
        <div className='row'>
          <div className='col-12'>
            <Table hover striped>
              <thead>
                <tr>
                  <th>Tanggal Restok</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              {isPending || isCreating ? (
                <Spinner size='xl' />
              ) : (
                <tbody>
                  {stok.length > 0 ? (
                    stok?.map((item) => {
                      return (
                        <tr key={item.id_restock}>
                          <td>{formatDate(item.restock_date)}</td>
                          <td>{item.qty_restock}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className='mt-2'>
                      <td>Belum ada stok</td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              )}
            </Table>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow((cur) => !cur)}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Stok barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label htmlFor='qty_restock'>Jumlah Barang</Form.Label>
            <Form.Control
              type='number'
              id='qty_restock'
              {...register('qty_restock', {
                required: 'Baris ini harus diisi',
              })}
            />

            <div className='mt-4 d-flex justify-content-end'>
              <Button type='submit'>Tambah Stok</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StokBarang;
