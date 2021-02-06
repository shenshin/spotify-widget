import Track from '../Track/Track';
import styles from './Tracklist.module.scss';

const Tracklist = ({ tracks }: { tracks: any[] }) => (
  <ol className={styles.tracklist}>
    {tracks.map(({ track }: any) => (
      <Track key={track.id} track={track} />
    ))}
  </ol>
);

export default Tracklist;
