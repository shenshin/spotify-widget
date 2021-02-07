import { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import style from './Playlist.module.scss';
import PlaylistType from './PlaylistType';

const Playlist = ({ playlist }: { playlist: PlaylistType }) => {
  const {
    name, description, images: [{ url: imageURL }], tracks: { items },
  } = playlist;

  const [tracksVisible, setTracksVisible] = useState(false);

  const showTracks = () => {
    setTracksVisible(!tracksVisible);
  };

  return (
    <div className={style.playlist}>
      <div
        onClick={showTracks}
        onKeyDown={() => {}}
        role="button"
        tabIndex={-1}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '6rem', marginBottom: '0.5rem' }}>
          <h3 style={{ width: 'max-content' }}>{`${items.length} tracks`}</h3>
          <img style={{ width: '100%' }} src={imageURL} alt={description} />
        </div>
        <h1 style={{ margin: 'auto' }}>{name}</h1>
      </div>
      {tracksVisible && <Tracklist tracks={items.map((item) => item.track)} />}
    </div>
  );
};

export default Playlist;
