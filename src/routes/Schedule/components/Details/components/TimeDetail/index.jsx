import './styles.css';

function TimeDetail(props) {
  const { time, doctors } = props;

  return (
    <div className="td-container">
      <div className="d-flex align-items-center">
        <div className="poin" />
        <div>{time}</div>
      </div>
      <div className="doctors">
        {doctors?.length ? (
          <>
            {doctors.map((doctor, idx) => {
              const key = `Doctor-${doctor}-${idx}`;
              return <div key={key}>{doctor}</div>;
            })}
          </>
        ) : (
          <div>No Doctor on this date</div>
        )}
      </div>
    </div>
  );
}

export default TimeDetail;
