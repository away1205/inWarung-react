import { IconEdit, IconTrash } from '@tabler/icons-react';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import useBarang from '../../hooks/useBarang';
import { formatCurrency } from '../../utils/helpers';
import useKategori from '../../hooks/useKategori';
import { useNavigate } from 'react-router-dom';

function DaftarBarang() {
  const { barang, isPending: isPendingBarang } = useBarang();
  const { kategori, isPending: isPendingKategori } = useKategori();
  const navigate = useNavigate();

  return (
    <div className='table-container p-5 mt-3 shadow-sm'>
      {isPendingBarang || isPendingKategori ? (
        <Spinner size='xl' />
      ) : (
        <table id='tabelBarang' className='table' style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Harga Grosir</th>
              <th>Harga Retail</th>
              <th>Jumlah Stok</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {barang?.map((item, i) => {
              return (
                <tr key={item.id_product}>
                  <td>{i + 1}</td>
                  <td>{item.product_name}</td>
                  <td>
                    {
                      kategori.find((k) => k.id_category === item.id_category)
                        ?.category_name
                    }
                  </td>
                  <td>{formatCurrency(item.wholesale_price)}</td>
                  <td>{formatCurrency(item.retail_price)}</td>
                  <td>{item.current_stock}</td>
                  <td className='d-flex gap-2'>
                    <OverlayTrigger
                      placement='right'
                      // delay={{ show: 250, hide: 250 }}
                      overlay={
                        <Tooltip id='button-tooltip-2'>
                          Edit {item.product_name}
                        </Tooltip>
                      }
                    >
                      <Button
                        variant='success'
                        onClick={() => navigate(`${item.id_product}`)}
                      >
                        <IconEdit />
                      </Button>
                    </OverlayTrigger>
                    {/* <Button
                      variant='danger'
                      onClick={() => handleDeleteBarang(item.id_product)}
                    >
                      <IconTrash />
                    </Button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DaftarBarang;
