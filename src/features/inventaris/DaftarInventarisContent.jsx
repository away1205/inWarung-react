import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

function DaftarInventarisContent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <Form.Label htmlFor='namabarang'>Nama</Form.Label>
          <Form.Control id='namabarang' />
          <Form.Label htmlFor='kategoribarang'>Kategori</Form.Label>
          <Form.Control id='kategoribarang' />
          <Form.Label htmlFor='merkbarang'>Merk</Form.Label>
          <Form.Control id='merkbarang' />
          <Form.Label htmlFor='beratbarang'>Berat</Form.Label>
          <Form.Control id='beratbarang' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Batalkan
          </Button>
          <Button variant='primary'>Tambahkan</Button>
        </Modal.Footer>
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
            Tambah Data
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
