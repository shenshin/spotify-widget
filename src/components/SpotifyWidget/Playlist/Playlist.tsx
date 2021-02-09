import { useState, useEffect } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import Artist from '../Artist/Artist';
import style from './Playlist.module.scss';
import PlaylistType from './PlaylistType';
import retrieveToken from '../util/retrieveToken';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface ArtistData {
  name: string;
  images: {
    url: string;
  }[];
}

async function retrieveArtist(artistURL: string, accessToken: string): Promise<ArtistData> {
  const response = await fetch(artistURL, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error(`Error retrieving artist info: ${response.statusText}`);
  return response.json();
}

const Playlist = ({ playlist }: { playlist: PlaylistType }): JSX.Element => {
  const {
    name, description, images: [{ url: playlistImageURL }], tracks: { items },
  } = playlist;
  const randomArtistIndex: number = Math.floor(Math.random() * items.length);
  const randomArtistURL: string = items[randomArtistIndex].track.artists[0].href;

  const [tracksVisible, setTracksVisible] = useState<boolean>(false);
  const [artistURL, setArtistURL] = useState<string>(randomArtistURL);

  const [artist, setArtist] = useState<ArtistData>();
  const [artistError, setAtristError] = useState<string>();
  const [artistLoading, setArtistLoading] = useState<boolean>(false);

  const showTracks = (): void => {
    setTracksVisible(!tracksVisible);
  };

  const showArtist = (url: string): void => {
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
        <div className={style.playlistImage}>
          <h3>{`${items.length} tracks`}</h3>
          <img src={playlistImageURL} alt={description} />
        </div>
        <h1>{name}</h1>

        {(artistLoading || artistError) && <LoadingSpinner />}
        {artist
            && !artistLoading
            && !artistError
            && (
            <Artist
              name={artist.name}
              imageURLs={artist.images.map((image) => image.url)}
              expanded={tracksVisible}
            />
            )}
      </div>
      <Tracklist
        showArtist={showArtist}
        tracks={items.map((item) => item.track)}
        expanded={tracksVisible}
      />
    </div>
  );
};

export default Playlist;
