import Track from '../Track/Track';
import styles from './Tracklist.module.scss';
import TrackType from '../Track/TrackType';
import ArtistType from '../Artist/ArtistType';

const Tracklist = ({ tracks, showArtist }: {
  tracks: TrackType[],
  showArtist: (artist: ArtistType) => void,
}) => (
  <ol className={styles.tracklist}>
    {tracks.map((track) => (
      <Track key={track.id} track={track} showArtist={showArtist} />
    ))}
  </ol>
);
export default Tracklist;
