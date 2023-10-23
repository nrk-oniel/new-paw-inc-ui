/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Button, Card } from 'react-bootstrap';

function NewsBox(props) {
  const {
    link, asset, alt, title,
  } = props;
  return (
    <Card className="mx-auto" style={{ width: '450px', height: '400px' }}>
      <Card.Img height="270" weight="270" variant="top" src={asset} alt={alt} />
      <Card.Body>
        <Card.Title style={{ width: '400px' }}>{title}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text> */}
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            window.open(`${link}`, '_blank');
          }}
        >
          Read News
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NewsBox;
