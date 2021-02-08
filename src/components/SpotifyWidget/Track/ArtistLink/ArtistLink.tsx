import ArtistType from '../../Artist/ArtistType';
import style from './ArtistLink.module.scss';

const ArtistLink = ({ artist, showArtist, isLastArtist }: {
  artist: ArtistType,
  showArtist: (arg: ArtistType) => void,
  isLastArtist: boolean,
}) => (
  <>
    <span
      className={style.artistLink}
      onClick={() => showArtist(artist)}
      onKeyDown={() => {}}
      role="button"
      tabIndex={-1}
    >
      {artist.name}
    </span>
    {!isLastArtist && ', '}
  </>
);

export default ArtistLink;
