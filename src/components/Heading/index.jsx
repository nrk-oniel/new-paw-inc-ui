function Heading(props) {
  const { title } = props;

  return (
    <h2 className="text-main pb-1" style={{ borderBottom: '1px solid #55097D' }}>{title}</h2>
  );
}

export default Heading;
