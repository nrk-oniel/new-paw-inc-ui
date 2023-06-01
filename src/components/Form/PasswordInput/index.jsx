import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, InputGroup } from 'react-bootstrap';

function PasswordInput(props) {
  const { placeholder, onChange, value } = props;
  const [show, setShow] = useState(false);

  return (
    <InputGroup>
      <Form.Control
        placeholder={placeholder}
        type={show ? 'text' : 'password'}
        className="form-control-square border-end-0"
        onChange={onChange}
        value={value}
      />
      <Button variant="form-control border-start-0" onClick={() => setShow((prev) => !prev)}>
        <FontAwesomeIcon icon={show ? faEyeSlash : faEye} color="#D9D9D9" />
      </Button>
    </InputGroup>
  );
}

export default PasswordInput;
