import './Container.css';

function Container({
  name, title, block, children,
}) {
  return (
    <div className={`container container_type_${name}`}>
        <h2 className={`container__title container__title_type_${block}`}>{title}</h2>
        {children}
    </div>
  );
}

export default Container;
