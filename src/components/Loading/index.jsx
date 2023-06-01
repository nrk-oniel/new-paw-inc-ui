import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className="content d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="main" />
    </div>
  );
}

export default Loading;
