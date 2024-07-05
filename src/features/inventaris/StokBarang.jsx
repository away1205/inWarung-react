import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function StokBarang() {
  const [show, setShow] = useState(false);
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
            <table
              id='tabelBarangPerPalet'
              className='table'
              style={{ width: '100%' }}
            >
              <thead></thead>
              <tbody></tbody>
            </table>
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
          <Form>
            <Form.Label htmlFor=''>Jumlah Barang</Form.Label>
            <Form.Control type='number' id='' />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StokBarang;
