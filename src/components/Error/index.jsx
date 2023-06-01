import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { URL_HOME } from '../../constants/urls';

function Error(props) {
  const navigate = useNavigate();

  const {
    title, subtitle, ctaLink = URL_HOME, ctaText = 'Back to Home',
  } = props;

  const handleOnClick = () => navigate(ctaLink);

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="text-center">
        <h1 className="display-3 fw-bold">{title}</h1>
        <p className="lead">
          {subtitle}
        </p>
        <div className="mt-3">
          <Button variant="main" onClick={handleOnClick}>{ctaText}</Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
