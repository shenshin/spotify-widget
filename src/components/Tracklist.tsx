import Track from './Track';

const Tracklist = ({ tracks }: any) => (
  <ol>
    {tracks.map(({ track }: any) => (
      <Track key={track.id} track={track} />
    ))}
  </ol>
);

export default Tracklist;
