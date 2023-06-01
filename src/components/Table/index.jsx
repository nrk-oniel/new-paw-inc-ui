import { Col, Row, Spinner } from 'react-bootstrap';
import './styles.css';

export const TABLE_MODEL = {
  MAIN: 'main',
  SELECT: 'selector',
};

function Table(props) {
  const {
    rowConfig,
    data = [],
    selectedId,
    onClickRow = () => {},
    model = TABLE_MODEL.MAIN,
    isLoading = true,
  } = props;

  return (
    <div className={`tbl-${model}`}>
      <Row className="thead">
        {rowConfig.map((row) => {
          const { text, colProps } = row;
          return <Col key={text} {...colProps}>{text}</Col>;
        })}
      </Row>
      {isLoading ? (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" variant="main" />
        </div>
      ) : (
        <div>
          {data.length === 0 ? (
            <Row className="p-4 text-center">
              <Col style={{ color: 'rgba(33, 30, 30, 0.55)' }}>No Data Found</Col>
            </Row>
          ) : (
            <>
              {data.map((item) => {
                const { id } = item;
                const isSelected = selectedId && selectedId === id;
                return (
                  <Row onClick={() => onClickRow(item)} className={`trow${isSelected ? ' active' : ''}`} key={`row-${id}`}>
                    {rowConfig.map((row) => {
                      const { key, colProps } = row;
                      return <Col {...colProps} key={`data-${id}-${key}`} className="tdata">{item[key]}</Col>;
                    })}
                  </Row>
                );
              })}
            </>
          )}
        </div>
      )}

    </div>
  );
}

export default Table;
