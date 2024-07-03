import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';

const tableHead = ['No', 'Nama', 'Kategori', 'Harga', 'Kuantitas', 'Total'];

function TabelTransaksi({ listTransaksi = [], onListTransaksi }) {
  function handleUpdateQty(index, num = 1) {
    const updatedList = listTransaksi.map((item, i) => {
      if (i === index) {
        return { ...item, qty: item.qty + num };
      }
      return item;
    });

    onListTransaksi(updatedList.filter((item) => item.qty > 0));
  }

  return (
    <Table>
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
              <td>{item.product_name}</td>
              <td>{item.id_category}</td>
              <td>${item.retail_price}</td>
              <td>{item.qty}</td>
              <td>${item.retail_price * item.qty}</td>
              <td className='d-flex gap-2'>
                <Button variant='danger' onClick={() => handleUpdateQty(i, -1)}>
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
          <td></td>
          <td></td>
          <td></td>
          <td>{listTransaksi.reduce((cur, item) => item.qty + cur, 0)}</td>
          <td>
            ${listTransaksi.reduce((cur, item) => item.retail_price + cur, 0)}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
}

export default TabelTransaksi;
