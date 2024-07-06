import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { formatCurrency } from '../../utils/helpers';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import useTambahTransaksi from '../../hooks/useTambahTransaksi';

const tableHead = ['No', 'Nama', 'Harga', 'Kuantitas', 'Total'];

function TabelTransaksi({
  listTransaksi = [],
  onListTransaksi,
  onTranscription,
}) {
  const [totalHarga, setTotalHarga] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const { tambahTransaksi, isCreating } = useTambahTransaksi();

  function handleUpdateQty(index, num = 1) {
    const updatedList = listTransaksi.map((item, i) => {
      if (i === index) {
        if (item.qty !== undefined) {
          return { ...item, qty: item.qty + num };
        } else {
          return { ...item, Quantity: item.Quantity + num };
        }
      }
      return item;
    });

    onListTransaksi(
      updatedList.filter((item) => item.qty > 0 || item.Quantity > 0)
    );
    setTotalQty((cur) => cur + index);
  }

  function handleSubmitTransaksi(data) {
    tambahTransaksi(data, {
      onSuccess: () => {
        onListTransaksi([]);
        onTranscription('');
      },
    });
  }

  useEffect(() => {
    setTotalHarga(
      listTransaksi.reduce(
        (cur, item) =>
          item.qty === undefined
            ? item.Quantity * item.Harga + cur
            : item.retail_price * item.qty + cur,
        0
      )
    );
    setTotalQty(
      listTransaksi.reduce(
        (cur, item) =>
          item.qty === undefined ? item.Quantity + cur : item.qty + cur,
        0
      )
    );
  }, [listTransaksi]);

  return (
    <>
      <Table className='mt-4'>
        <thead>
          <tr>
            {tableHead.map((item) => (
              <th key={item}>{item}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listTransaksi?.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {item.product_name == undefined
                    ? item.Produk
                    : item.product_name}
                </td>
                {/* <td>{item.id_category}</td> */}
                <td>{formatCurrency(item.retail_price || item.Harga)}</td>
                <td>{item.qty || item.Quantity}</td>
                <td>
                  {formatCurrency(
                    item.qty === undefined
                      ? item.Harga * item.Quantity
                      : item.retail_price * item.qty
                  )}
                </td>
                <td className='d-flex gap-2'>
                  <Button
                    variant='danger'
                    onClick={() => handleUpdateQty(i, -1)}
                  >
                    -
                  </Button>
                  <Button onClick={() => handleUpdateQty(i, 1)}>+</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            {/* <td></td> */}
            <td></td>
            <td></td>
            <td>{totalQty}</td>
            <td>{formatCurrency(totalHarga)}</td>
            <td></td>
          </tr>
        </tfoot>
      </Table>

      <Button
        variant={isCreating ? 'primary' : 'outline-primary'}
        onClick={handleSubmitTransaksi}
      >
        {isCreating ? (
          <>
            <Spinner
              as='span'
              animation='grow'
              size='sm'
              role='status'
              aria-hidden='true'
            />
            <span className='ml-2'> Mohon Menunggu</span>
          </>
        ) : (
          'Terima Pesanan'
        )}
      </Button>
    </>
  );
}

export default TabelTransaksi;
