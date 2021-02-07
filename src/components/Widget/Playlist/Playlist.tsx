import { useState } from 'react';
import style from './Playlist.module.scss';
import Tracklist from '../Tracklist/Tracklist';

const Playlist = ({ playlist }: { playlist: any }) => {
  const {
    name, description, images: [{ url: imageURL }], tracks: { items },
  } = playlist;

  const [tracksVisible, setTracksVisible] = useState(false);

  const showTracks = () => {
    setTracksVisible(!tracksVisible);
  };

  return (
    <div className={style.playlist}>
      <div onClick={showTracks} onKeyDown={showTracks} role="button" tabIndex={-1}>
        <h1>{name}</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: 100, height: 100 }} src={imageURL} alt={description} />
          <h2 style={{ marginLeft: 10 }}>{`${items.length} tracks`}</h2>
        </div>
      </div>
      {tracksVisible && <Tracklist tracks={items} />}
    </div>
  );
};

export default Playlist;
