import style from './Track.module.scss';
import TrackType from './TrackType';

const Track = ({ track }: { track: TrackType }) => {
  const { name, artists } = track;
  const artistList = artists.map((artist) => artist.name).join(', ');
  return (
    <li className={style.track}>
      {`${artistList} — «${name}»`}
    </li>
  );
};

export default Track;
