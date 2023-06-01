import ButtonForm from '../../Form/ButtonForm';
import ActionModal from '../../../hooks/useActionModal/ActionModal';

import imageApprove from './assets/payment.png';
import useActionModal from '../../../hooks/useActionModal';
import useAxios from '../../../hooks/useAxios';
import { API_APPROVE_TICKET, API_REJECT_TICKET } from '../../../constants/api';

const ONGOING_STAFF_CONTAINER = {
  className: 'p-2',
  style: { backgroundColor: '#FFB4B4' },
};

function StaffActionInfo(props) {
  const { onReload, data } = props;

  const { isLoading, request, error } = useAxios({
    method: 'POST',
    isLazy: true,
  });

  const handleOnOk = async (isApprove) => {
    const url = `${isApprove ? API_APPROVE_TICKET : API_REJECT_TICKET}/${data.id}`;

    const { isSuccess } = await request({ url });
    if (isSuccess) {
      setTimeout(() => {
        onReload();
      }, 1500);
    }
    return isSuccess;
  };

  const { onTriggerSubmit, modalProps } = useActionModal({ onOk: () => handleOnOk(true) });
  const {
    onTriggerSubmit: onTriggerDelete,
    modalProps: deleteModalProps,
  } = useActionModal({ onOk: () => handleOnOk(false) });

  return (
    <>
      <div {...ONGOING_STAFF_CONTAINER}>
        <p className="m-0">REMINDER :</p>
        <p>
          You can approve the payment of this ticket if the customer
          has paid the consultation fee based on the payment regulation
          made by the clinic. Paw Inc. will not take any responsibility
          of any payment failure so it is very important to check whether
          the customer has fulfill their obligations to pay.
        </p>
      </div>
      {error && <span className="text-danger">{error}</span>}
      <ButtonForm
        className="my-3"
        firstText="Reject"
        onClickFirst={onTriggerDelete}
        secondText="Approved"
        onClickSecond={onTriggerSubmit}
        secondLoading={isLoading}
        firstLoading={isLoading}
      />
      <ActionModal
        confirmImage={imageApprove}
        confirmText="ARE YOU SURE YOU WANT TO APPROVE THIS TICKET PAYMENT"
        failedText="PAYMENT FAILS"
        successText="SUCCESS SUBMIT DATA"
        modalProps={modalProps}
        secondLoading={isLoading}
      />
      <ActionModal
        confirmText="ARE YOU SURE YOU WANT TO REJECT THIS TICKET?"
        failedText="FAILED TO REJECT TICKET"
        successText="SUCCESS REJECT TICKET"
        modalProps={deleteModalProps}
        secondLoading={isLoading}
      />
    </>
  );
}

export default StaffActionInfo;
