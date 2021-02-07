import { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import style from './Playlist.module.scss';
import PlaylistType from './PlaylistType';
import ArtistType from '../Artist/ArtistType';

const Playlist = ({ playlist }: { playlist: PlaylistType }) => {
  const {
    name, description, images: [{ url: imageURL }], tracks: { items },
  } = playlist;

  const [tracksVisible, setTracksVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistType>();

  const showTracks = () => {
    setTracksVisible(!tracksVisible);
    setSelectedArtist(undefined);
  };

  const showArtist = (artist: ArtistType) => {
    setSelectedArtist(artist);
  };

  return (
    <div className={style.playlist}>
      <div
        onClick={showTracks}
        onKeyDown={() => {}}
        role="button"
        tabIndex={-1}
        className={style.bigButton}
      >
        <div>
          <h3>{`${items.length} tracks`}</h3>
          <img src={imageURL} alt={description} />
        </div>
        <h1>{name}</h1>
        {selectedArtist && <p>{selectedArtist.name}</p>}
      </div>
      {tracksVisible && (
      <Tracklist
        showArtist={showArtist}
        tracks={items.map((item) => item.track)}
      />
      )}
    </div>
  );
};

export default Playlist;
