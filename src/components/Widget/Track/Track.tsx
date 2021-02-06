import style from './Track.module.scss';

const Track = ({ track }: { track: any }) => {
  const { name, artists } = track;
  const artistList = artists.map((artist: any) => artist.name).join(', ');
  return (
    <li className={style.track}>
      {`${artistList} — «${name}»`}
    </li>
  );
};

export default Track;
