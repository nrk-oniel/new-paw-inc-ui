import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
// import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../components/Layout/ListLayout';
// import ROLES from '../../constants/roles';
import ExtraInput from '../../components/Form/ExtraInput';
import Table from '../../components/Table';
import { URL_ADD_USER, URL_EDIT_USER } from '../../constants/urls';
import Pagination from '../../components/Pagination';
import useAxios from '../../hooks/useAxios';
import { API_GET_STAFFS } from '../../constants/api';
import Error from '../../components/Error';
import mapRole from '../../helpers/mapRole';

// const DUMMY_DATA = [...Array(10)].map((_, idx) => ({
//   id: idx,
//   name: `Clinic-${idx}`,
//   email: `email-${idx}@gmail.com`,
//   phone: idx,
//   role: ROLES.STAFF,
// }));

const ENTRIES = [10, 20, 50, 100];

const constructURLParam = (data) => {
  const { entries, keyword, page } = data;
  const urlParams = new URLSearchParams(
    {
      ...(entries && { per_page: entries }),
      ...(keyword && { clinic_name: keyword }),
      ...(page && { page }),
    },
  ).toString();
  const newUrl = `${API_GET_STAFFS}${urlParams ? `?${urlParams}` : ''}`;
  return newUrl;
};

function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ entries: 10, keyword: '' });

  const {
    response, error, request, isLoading,
  } = useAxios({
    url: API_GET_STAFFS,
    method: 'GET',
  });

  const handleAddUser = () => navigate(URL_ADD_USER);

  const setValue = async (key, val) => {
    const entries = key === 'entries' ? val : filter.entries;
    const keyword = key === 'keyword' ? val : filter.keyword;

    // hit api ketika filter berubah
    request({
      url: constructURLParam({ entries, keyword, page: 1 }),
    });

    setFilter((prev) => ({
      ...prev,
      [key]: val,
    }));
    setPage(1);
  };

  const onClickPage = async (val) => {
    // hit api ketika ganti page
    const { entries, keyword } = filter;
    request({
      url: constructURLParam({ entries, keyword, page: val }),
    });
    setPage(val);
  };

  const list = response?.data?.data || [];
  const maxPage = response?.data?.last_page || 1;

  const userList = list.map((userData) => {
    const user = { ...userData };
    const id = user.id || 0;
    const onClickEdit = () => navigate(URL_EDIT_USER(id));
    return {
      id,
      name: user.username || '',
      email: user.email || '',
      phone: user.phone_number || '',
      role: mapRole(user.role_id),
      action: (
        <Button variant="main" className="btn-square" onClick={onClickEdit}>
          Edit
        </Button>
      ),
    };
  });

  const tableData = {
    tableName: 'Schedule',
    rowConfig: [
      { text: 'Clinic Name', key: 'name' },
      { text: 'Email', key: 'email' },
      { text: 'Phone Number', key: 'phone' },
      { text: 'Edit', key: 'action', colProps: { xs: 2 } },
    ],
    data: userList,
    isLoading,
  };

  if (error) {
    return (
      <div className="content d-flex align-items-center justify-content-center">
        <Error title="Error" subtitle={error} />
      </div>
    );
  }

  return (
    <div className="content">
      <ListLayout title="USER LIST">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="second" className="btn-square" onClick={handleAddUser}>
            Add new user
          </Button>
        </div>
        <Row className="mb-4">
          <Col xs={3}>
            <Row className="align-items-center">
              <Col xs={5}>
                <Form.Select className="form-control-square" value={filter.entries} onChange={(e) => setValue('entries', e.target.value)}>
                  {ENTRIES.map((item) => <option value={item} key={item}>{item}</option>)}
                </Form.Select>
              </Col>
              <Col className="px-2">
                <div>
                  entries
                </div>
              </Col>
            </Row>
          </Col>
          <Col />
          <Col xs={3}>
            <ExtraInput extra={<FontAwesomeIcon icon={faSearch} />} placeholder="Search" value={filter.keyword} onChange={(e) => setValue('keyword', e.target.value)} />
          </Col>
        </Row>
        <Table {...tableData} />
        {!isLoading && (
          <div className="d-flex justify-content-end mt-3">
            <Pagination curr={page} max={maxPage} onClickPage={onClickPage} />
          </div>
        )}
      </ListLayout>
    </div>
  );
}

export default UserList;
