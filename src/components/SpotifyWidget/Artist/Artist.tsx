import style from './Artist.module.scss';

const Artist = ({ name, imageURLs, expanded }: {
  name: string,
  imageURLs: string[],
  expanded: boolean,
}): JSX.Element => {
  const randomIndex: number = Math.floor(Math.random() * imageURLs.length);
  return (
    <div className={`${style.artist} ${!expanded ? style.minimized : ''}`}>
      <img src={imageURLs[randomIndex]} alt={name} />
      {expanded && <p>{name}</p>}
    </div>
  );
};

export default Artist;
