import Error from '../../components/Error';

function NotFound() {
  return (
    <div className="content d-flex align-items-center justify-content-center">
      <Error title="Not Found" subtitle="The page you are looking for doesn't exist or you don't have access to the page" />
    </div>
  );
}

export default NotFound;
