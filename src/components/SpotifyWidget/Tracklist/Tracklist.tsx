import Track from '../Track/Track';
import styles from './Tracklist.module.scss';
import TrackType from '../Track/TrackType';

const Tracklist = ({ tracks }: { tracks: TrackType[] }) => (
  <ol className={styles.tracklist}>
    {tracks.map((track) => (
      <Track key={track.id} track={track} />
    ))}
  </ol>
);
export default Tracklist;
