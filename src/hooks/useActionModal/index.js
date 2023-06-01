import { useState } from 'react';

function useActionModal(props) {
  const { onOk } = props;
  const [showModal, setShowModal] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const handleOnOk = async () => {
    setShowModal(false);
    const isSuccess = await onOk();
    if (!isSuccess) setShowModalFailed(true);
    else setShowModalSuccess(true);
  };

  return {
    onTriggerSubmit: () => setShowModal(true),
    modalProps: {
      confirmation: {
        show: showModal,
        onOk: handleOnOk,
        onHide: () => setShowModal(false),
      },
      failed: {
        show: showModalFailed,
        onHide: () => setShowModalFailed(false),
      },
      success: {
        show: showModalSuccess,
        onHide: () => setShowModalSuccess(false),
      },
    },
  };
}

export default useActionModal;
