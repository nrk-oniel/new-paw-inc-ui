import { Table } from 'react-bootstrap';
import ExtraInfo from './ExtraInfo';

function TableDetail(props) {
  const { data, mode, onReload } = props;

  return (
    <Table bordered>
      <tbody>
        <tr>
          <td>Pet Type</td>
          <td>{data.details.type}</td>
        </tr>
        <tr>
          <td>Symptoms</td>
          <td>{data.details.symtoms}</td>
        </tr>
        <tr>
          <td>Clinic Address</td>
          <td>{data.clinic.address}</td>
        </tr>
        <tr>
          <td>Booking Time</td>
          <td>{data.details.time}</td>
        </tr>
        <tr>
          <td>Doctor</td>
          <td>{data.details.doctor}</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <ExtraInfo mode={mode} data={data} onReload={onReload} />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TableDetail;
