import { useState, useEffect } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import Artist from '../Artist/Artist';
import style from './Playlist.module.scss';
import PlaylistType from './PlaylistType';
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

interface ArtistData {
  name: string;
  images: {
    url: string;
  }[];
}

const Playlist = ({ playlist }: { playlist: PlaylistType }) => {
  const {
    name, description, images: [{ url: playlistImageURL }], tracks: { items },
  } = playlist;

  const [tracksVisible, setTracksVisible] = useState(false);
  const [artistURL, setArtistURL] = useState('');

  const [artist, setArtist] = useState<ArtistData>();
  const [artistError, setAtristError] = useState('');
  const [artistLoading, setArtistLoading] = useState(false);

  const showTracks = () => {
    setTracksVisible(!tracksVisible);
    setArtistURL('');
    setArtist(undefined);
  };

  const showArtist = (url: string) => {
    setArtistURL(url);
  };

  useEffect(() => {
    (async () => {
      try {
        if (artistURL) {
          setAtristError('');
          setArtistLoading(true);
          const accessToken = await retrieveToken();
          const artistInfo = await retrieveArtist(artistURL, accessToken);
          setArtist(artistInfo);
        }
      } catch (err) {
        setAtristError('Could not load artist data');
      } finally {
        setArtistLoading(false);
      }
    })();
  }, [artistURL]);

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
          {artistLoading && <LoadingSpinner />}
          {artistError && <p className="error-message">{artistError}</p>}
          {artist
            && !artistLoading
            && !artistError
            && (
            <Artist
              name={artist.name}
              imageURLs={artist.images.map((image) => image.url)}
            />
            )}
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
