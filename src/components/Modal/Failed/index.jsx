import { Modal } from 'react-bootstrap';

import modalImage from './assets/failed.png';

function ModalFailed(props) {
  const { show, onHide, text } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Body className="text-center p-5">
        <img src={modalImage} alt="confirmation" height={250} />
        <h3 className="fw-bold mt-5">{text}</h3>
      </Modal.Body>
    </Modal>
  );
}

export default ModalFailed;
