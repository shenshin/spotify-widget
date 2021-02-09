import Track from '../Track/Track';
import styles from './Tracklist.module.scss';
import TrackType from '../Track/TrackType';

const Tracklist = ({ tracks, showArtist, expanded }: {
  tracks: TrackType[],
  showArtist: (url: string) => void,
  expanded: boolean,
}): JSX.Element => (
  <ol className={`${styles.tracklist} ${expanded ? styles.visible : styles.hidden}`}>
    {tracks.map((track) => (
      <Track key={track.id} track={track} showArtist={showArtist} />
    ))}
  </ol>
);
export default Tracklist;
