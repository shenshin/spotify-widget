import style from './Track.module.scss';
import TrackType from './TrackType';
import ArtistLink from './ArtistLink/ArtistLink';

const Track = ({ track, showArtist }: {
  track: TrackType,
  showArtist: (url: string) => void,
}): JSX.Element => {
  const { name: trackName, artists } = track;
  function isLastArtist(index: number): boolean {
    return index === artists.length - 1;
  }
  return (
    <li className={style.track}>
      {artists.map((artist, index) => (
        <ArtistLink
          key={artist.id}
          artist={artist}
          showArtist={showArtist}
          isLastArtist={isLastArtist(index)}
        />
      ))}
      {` — «${trackName}»`}
    </li>
  );
};

export default Track;
