import { Form } from 'react-bootstrap';

import Heading from '../../../../components/Heading';

function PetClinic(props) {
  const { value, setValue, error } = props;

  return (
    <div className="mt-2 mb-5">
      <Heading title="Pet Details" />
      <Form.Group className="mb-2">
        <Form.Label>Pet Type</Form.Label>
        <Form.Control required type="text" className="form-control-square" value={value.type} onChange={(e) => setValue('type', e.target.value)} />
        {error?.type && <span className="text-danger">Please Fill Pet Type</span>}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Symptoms</Form.Label>
        <Form.Control as="textarea" className="form-control-square" rows={3} value={value.symptoms} onChange={(e) => setValue('symptoms', e.target.value)} />
        {error?.symptoms && <span className="text-danger">Please Fill Symptoms</span>}
      </Form.Group>
    </div>
  );
}

export default PetClinic;
