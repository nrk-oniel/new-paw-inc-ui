import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Heading from '../../../../components/Heading';
import ExtraInput from '../../../../components/Form/ExtraInput';
import Table, { TABLE_MODEL } from '../../../../components/Table';
import Maps from '../../../../components/Maps';
import useAxios from '../../../../hooks/useAxios';

import { API_FILTER_CLINIC } from '../../../../constants/api';
import { normalizeClinic, distanceMarker } from './helpers';

const constructURLParam = (clinicName) => {
  const urlParams = new URLSearchParams(
    {
      ...(clinicName && { clinic_name: clinicName }),
    },
  ).toString();
  const newUrl = `${API_FILTER_CLINIC}${urlParams ? `?${urlParams}` : ''}`;
  return newUrl;
};

function PetClinic(props) {
  const { value, setValue, error } = props;
  const [keyword, setKeyword] = useState('');

  const {
    response, isLoading, error: errorResponse, request,
  } = useAxios({
    method: 'GET',
    url: API_FILTER_CLINIC,
  });

  const clinicData = normalizeClinic(response);

  const clinicCoordinates = distanceMarker(response);

  const selectedData = value.clinic?.address || '';

  const onChangeKeyword = (key) => {
    setKeyword(key);
    request({
      url: constructURLParam(key),
    });
  };

  const tableData = {
    tableName: 'Clinic',
    rowConfig: [
      { text: 'Pet Clinic', key: 'name' },
      { text: 'Address', key: 'address' },
      { text: 'Distance', key: 'distance' },
    ],
    data: clinicData,
    selectedId: value.clinic?.id,
    onClickRow: (data) => setValue('clinic', data),
    model: TABLE_MODEL.SELECT,
    isLoading,
  };

  return (
    <div className="mt-2 mb-5">
      <Heading title="Pet Clinic" />
      <Form.Group className="mb-5">
        <Form.Label>Choose your Consultation Pet Clinic</Form.Label>
        <ExtraInput extra={<FontAwesomeIcon icon={faSearch} />} placeholder="Search" value={keyword} onChange={(e) => onChangeKeyword(e.target.value)} />
        {errorResponse && <span className="text-danger">{errorResponse}</span>}
      </Form.Group>
      <div id="map" className="my-5">
        <Maps data={clinicCoordinates} />
      </div>
      <Table {...tableData} />
      <div className="mt-5 mb-2">
        <p className="mb-3">Chosen Pet Clinic</p>
        <div className="selected-box">{selectedData}</div>
        {error?.clinic && <span className="text-danger">Please Select Clinic</span>}
      </div>
    </div>
  );
}

export default PetClinic;
