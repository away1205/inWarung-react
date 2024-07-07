import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/helpers';

function TableRekomendasi(resultForecast = []) {
  const result = resultForecast.resultForecast.result;
  const resTypeForecast = result.filter((item) => item.type === 'forecast');
  const summary = resultForecast.resultForecast.summary;

  return (
    <>
      {/* <Table striped border>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Quantitas</th>
            <th>Harga Grosir</th>
            <th>Harga Total</th>
          </tr>
        </thead>
        <tbody style={{ maxHeight: '10rem' }}>
          {resTypeForecast?.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.product_name}</td>
                <td>{item.value}</td>
                <td>{item.wholesale_price}</td>
                <td>{item.total_price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table> */}

      <div>
        {/* <h6>Summary</h6> */}
        <Table striped border={true}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Quantitas</th>
              <th>Harga Grosir</th>
              <th>Harga Total</th>
            </tr>
          </thead>
          <tbody>
            {summary.details.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.product_name}</td>
                  <td>{item.value}</td>
                  <td>{formatCurrency(item.wholesale_price)}</td>
                  <td>{formatCurrency(item.total_price)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total restock</td>
              <td></td>
              <td>
                {summary.details.reduce((cur, item) => item.value + cur, 0)}
              </td>
              <td></td>
              <td>{formatCurrency(summary.total)}</td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
}

export default TableRekomendasi;
