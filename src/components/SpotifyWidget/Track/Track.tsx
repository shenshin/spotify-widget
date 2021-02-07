import ArtistType from '../Artist/ArtistType';
import style from './Track.module.scss';
import TrackType from './TrackType';

const Track = ({ track, showArtist }: {
  track: TrackType,
  showArtist: (artist: ArtistType) => void,
}) => {
  const { name: trackName, artists } = track;
  return (
    <li className={style.track}>
      {artists.map((artist, index) => (
        <span
          key={artist.id}
          className={style.artistButton}
          onClick={() => showArtist(artist)}
          onKeyDown={() => {}}
          role="button"
          tabIndex={-1}
        >
          {`${artist.name}${index !== artists.length - 1 ? ', ' : ''}`}
        </span>
      ))}
      {` — «${trackName}»`}
    </li>
  );
};

export default Track;
