import { useState, useEffect } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import Artist from '../Artist/Artist';
import style from './Playlist.module.scss';
import PlaylistType from './PlaylistType';
import ArtistType from '../Artist/ArtistType';
import retrieveToken from '../util/retrieveToken';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

async function retrieveArtist(artistURL: string, accessToken: string) {
  const response = await fetch(artistURL, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error(`Error retrieving artist info: ${response.statusText}`);
  return response.json();
}

const Playlist = ({ playlist }: { playlist: PlaylistType }) => {
  const {
    name, description, images: [{ url: playlistImageURL }], tracks: { items },
  } = playlist;

  const [tracksVisible, setTracksVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistType>();

  const [fetchedArtist, setFetchedArtist] = useState();
  const [artistFetchError, setAtristFetchError] = useState('');
  const [artistDataLoading, setArtistDataLoading] = useState(false);

  const showTracks = () => {
    setTracksVisible(!tracksVisible);
    setSelectedArtist(undefined);
    setFetchedArtist(undefined);
  };

  const showArtist = (artist: ArtistType) => {
    setSelectedArtist(artist);
  };

  useEffect(() => {
    (async () => {
      try {
        if (selectedArtist) {
          setAtristFetchError('');
          setArtistDataLoading(true);
          const accessToken = await retrieveToken();
          const artistInfo = await retrieveArtist(selectedArtist.href, accessToken);
          setFetchedArtist(artistInfo);
        }
      } catch (err) {
        setAtristFetchError(err.message);
      } finally {
        setArtistDataLoading(false);
      }
    })();
  }, [selectedArtist]);

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
          <img src={playlistImageURL} alt={description} />
        </div>
        <h1>{name}</h1>

        <div>
          {artistDataLoading && <LoadingSpinner />}
          {artistFetchError && <p className="error-message">{artistFetchError}</p>}
          {fetchedArtist
            && !artistDataLoading
            && !artistFetchError
            && <Artist artist={fetchedArtist} />}
        </div>
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
