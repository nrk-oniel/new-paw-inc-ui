import { Modal } from 'react-bootstrap';

import defaultImage from './assets/confirmation.png';
import ButtonForm from '../../Form/ButtonForm';

function ModalConfirmation(props) {
  const {
    show, onHide, text, onOk, image, firstLoading, secondLoading,
  } = props;

  const imageModal = image || defaultImage;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Body className="text-center p-5">
        <img src={imageModal} alt="confirmation" height={350} />
        <h4 className="fw-bold mt-3">{text}</h4>
        <ButtonForm
          firstLoading={firstLoading}
          secondLoading={secondLoading}
          onClickFirst={onHide}
          firstText="No"
          onClickSecond={onOk}
          secondText="Yes"
          className="mt-3"
        />
      </Modal.Body>
    </Modal>
  );
}

export default ModalConfirmation;
