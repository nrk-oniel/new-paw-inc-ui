import { useNavigate } from 'react-router-dom';
import ButtonWithLoad from '../../ButtonWithLoad';

function ButtonForm(props) {
  const navigate = useNavigate();
  const {
    onClickFirst = () => navigate(-1),
    firstText = 'Back',
    onClickSecond = () => {},
    secondText = 'Submit',
    className: classContainer = 'my-5',
    firstLoading = false,
    secondLoading = false,
  } = props;

  return (
    <div className={`text-center ${classContainer}`}>
      <ButtonWithLoad disabled={secondLoading} isLoading={firstLoading} variant="secondary" className="btn-square mx-4" onClick={onClickFirst}>
        {firstText}
      </ButtonWithLoad>
      <ButtonWithLoad disabled={firstLoading} isLoading={secondLoading} variant="main" className="btn-square mx-4" onClick={onClickSecond}>
        {secondText}
      </ButtonWithLoad>
    </div>
  );
}

export default ButtonForm;
