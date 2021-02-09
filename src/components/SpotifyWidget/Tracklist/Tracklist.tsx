import Track from '../Track/Track';
import styles from './Tracklist.module.scss';
import TrackType from '../Track/TrackType';

const Tracklist = ({ tracks, showArtist }: {
  tracks: TrackType[],
  showArtist: (url: string) => void,
}): JSX.Element => (
  <ol className={styles.tracklist}>
    {tracks.map((track) => (
      <Track key={track.id} track={track} showArtist={showArtist} />
    ))}
  </ol>
);
export default Tracklist;
