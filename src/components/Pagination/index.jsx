import { Pagination as BsPagination } from 'react-bootstrap';
import { paginationList } from './helpers';
import './styles.css';

function Pagination(props) {
  const { curr, max, onClickPage } = props;
  const list = paginationList(curr, max);

  const handleOnClick = (item) => {
    onClickPage(item);
  };

  const handleClickPrev = () => {
    if (curr === 1) return;
    onClickPage(curr - 1);
  };

  const handleClickNext = () => {
    if (curr === max) return;
    onClickPage(curr + 1);
  };

  return (
    <BsPagination className="page-main">
      <BsPagination.First onClick={() => onClickPage(1)} />
      <BsPagination.Prev onClick={handleClickPrev} />
      {list.map((item, idx) => {
        const isActive = item === curr;
        if (item === '...') {
          const key = `ellipsis-${idx}`;
          return <BsPagination.Ellipsis key={key} />;
        }
        return (
          <BsPagination.Item
            active={isActive}
            key={item}
            onClick={() => handleOnClick(item)}
          >
            {item}
          </BsPagination.Item>
        );
      })}
      <BsPagination.Next onClick={handleClickNext} />
      <BsPagination.Last onClick={() => onClickPage(max)} />
    </BsPagination>
  );
}

export default Pagination;
