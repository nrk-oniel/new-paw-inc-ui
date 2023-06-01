import { Form, InputGroup } from 'react-bootstrap';

function ExtraInput(props) {
  const {
    placeholder, onChange, value, extra, position = 'start',
  } = props;

  const hideBorder = position === 'start' ? 'border-start-0' : 'border-end-0';

  return (
    <InputGroup>
      {position === 'start' && <InputGroup.Text className="input-group-text-main">{extra}</InputGroup.Text>}
      <Form.Control
        placeholder={placeholder}
        type="text"
        className={`form-control-square ${hideBorder}`}
        onChange={onChange}
        value={value}
      />
      {position === 'end' && <InputGroup.Text>{extra}</InputGroup.Text>}
    </InputGroup>
  );
}

export default ExtraInput;
