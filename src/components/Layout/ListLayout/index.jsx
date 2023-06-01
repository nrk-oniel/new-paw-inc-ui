function ListLayout(props) {
  const { title, children } = props;

  return (
    <div className="px-5 mb-5">
      <div className="bg-main">
        <h3 className="text-white p-3 m-0">{title}</h3>
      </div>
      <div className="bg-second p-4">
        {children}
      </div>
    </div>
  );
}

export default ListLayout;
