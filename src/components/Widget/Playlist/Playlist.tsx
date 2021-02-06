import style from './Playlist.module.scss';
import Tracklist from '../Tracklist/Tracklist';

const Playlist = ({ playlist }: { playlist: any }) => {
  const {
    name, description, images: [{ url: imageURL }], tracks: { items },
  } = playlist;
  return (
    <div className={style.playlist}>
      <h1>{name}</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img style={{ width: 100, height: 100 }} src={imageURL} alt={description} />
        <h2 style={{ marginLeft: 10 }}>{`${items.length} tracks`}</h2>
      </div>
      <Tracklist tracks={items} />
    </div>
  );
};

export default Playlist;
