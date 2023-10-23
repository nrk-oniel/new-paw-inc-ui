import { useState, useEffect } from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';

import Heading from '../../../../components/Heading';
import Table, { TABLE_MODEL } from '../../../../components/Table';
import { normalizeSchedule } from './helpers';
import useAxios from '../../../../hooks/useAxios';
import { API_FILTER_SCHEDULE } from '../../../../constants/api';
import ButtonWithLoad from '../../../../components/ButtonWithLoad';

const constructURLParam = (filter, value) => {
  const [year, month, date] = filter.date.split('-');
  const [hour, minute] = filter.time.split(':');
  const clinicId = Number(value.clinic?.id) || 0;

  const urlParams = new URLSearchParams(
    {
      ...(date && { date }),
      ...(month && { month }),
      ...(year && { year }),
      ...(hour && { hour }),
      ...(minute && { minute }),
    },
  ).toString();
  const newUrl = `${API_FILTER_SCHEDULE}/${clinicId}${urlParams ? `?${urlParams}` : ''}`;
  return newUrl;
};

function BookingSchedule(props) {
  const { value, setValue, error } = props;
  const [filter, setFilter] = useState({ date: '', time: '' });
  const [errorLocal, setErrorLocal] = useState('');

  const {
    response, isLoading, error: errRes, request,
  } = useAxios({
    method: 'GET',
    isLazy: true,
  });

  const schdData = normalizeSchedule(response);

  const selectedData = value.schedule ? `${value.schedule.date} - ${value.schedule.time} - ${value.schedule.doctor}` : '';

  useEffect(() => {
    setFilter({ date: '', time: '' });
    if (value.clinic?.id !== 0 && value.clinic?.id !== undefined) {
      request({
        url: constructURLParam({ date: '', time: '' }, value),
      });
    }
  }, [value.clinic?.id]);

  const handleOnClickFilter = () => {
    if (!value.clinic?.id) {
      setErrorLocal('Please Select Clinic first');
    } else {
      request({
        url: constructURLParam(filter, value),
      });
    }
  };

  const errorResponse = errorLocal || errRes;
  const tableData = {
    tableName: 'Schedule',
    rowConfig: [
      { text: 'Date', key: 'date' },
      { text: 'Time', key: 'time' },
      { text: 'Doctor', key: 'doctor' },
    ],
    data: schdData,
    selectedId: value.schedule?.id,
    onClickRow: (data) => setValue('schedule', data),
    model: TABLE_MODEL.SELECT,
    isLoading,
  };

  const setData = (key, val) => {
    setFilter((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <div className="mt-2 mb-5">
      <Heading title="Booking Schedule" />
      <Form.Group className="mb-5">
        <Form.Label>Choose your Consultation Day</Form.Label>
        <Row>
          <Col xs="5">
            <Form.Control required type="date" className="form-control-square" value={filter.date} onChange={(e) => setData('date', e.target.value)} />
          </Col>
          <Col xs="5">
            <Form.Control required type="time" className="form-control-square" value={filter.time} onChange={(e) => setData('time', e.target.value)} />
          </Col>
          <Col>
            <ButtonWithLoad isLoading={isLoading} variant="main" className="btn-square w-100" onClick={handleOnClickFilter}>
              Filter
            </ButtonWithLoad>
          </Col>
        </Row>
        {errorResponse && <span className="text-danger">{errorResponse}</span>}
      </Form.Group>
      <Table {...tableData} />
      <div className="mt-5 mb-2">
        <p className="mb-3">Your booking schedule</p>
        <div className="selected-box">{selectedData}</div>
        {error?.schedule && <span className="text-danger">Please Select Schedule</span>}
      </div>
    </div>
  );
}

export default BookingSchedule;
