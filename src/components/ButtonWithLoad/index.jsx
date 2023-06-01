import { Button, Spinner } from 'react-bootstrap';

function ButtonWithLoad(props) {
  const { isLoading, children, ...rest } = props;

  if (isLoading) {
    return (
      <Button {...rest} disabled>
        <div className="d-flex">
          <div style={{ marginRight: '6px' }}><Spinner animation="border" size="sm" /></div>
          {children}
        </div>
      </Button>
    );
  }

  return <Button {...rest}>{children}</Button>;
}

export default ButtonWithLoad;
