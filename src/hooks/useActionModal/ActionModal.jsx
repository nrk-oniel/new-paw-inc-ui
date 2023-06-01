import ModalConfirmation from '../../components/Modal/Confirmation';
import ModalFailed from '../../components/Modal/Failed';
import ModalSuccess from '../../components/Modal/Success';

function ActionModal(props) {
  const {
    modalProps, confirmText, successText, failedText, confirmImage, firstLoading, secondLoading,
  } = props;

  return (
    <>
      <ModalConfirmation
        {...modalProps.confirmation}
        text={confirmText}
        image={confirmImage}
        firstLoading={firstLoading}
        secondLoading={secondLoading}
      />
      <ModalSuccess {...modalProps.success} text={successText} />
      <ModalFailed {...modalProps.failed} text={failedText} />
    </>
  );
}

export default ActionModal;
