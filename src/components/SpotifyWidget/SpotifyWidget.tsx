import React, { useState, useEffect } from 'react';
import style from './SpotifyWidget.module.scss';
import retrieveToken from './util/retrieveToken';
import Playlist from './Playlist/Playlist';
import PlaylistType from './Playlist/PlaylistType';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

async function retrievePlaylist(playlistID: string, accessToken: string): Promise<PlaylistType> {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error(`Error retrieving playlist: ${response.statusText}`);
  return response.json();
}

const SpotifyWidget = (): JSX.Element => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Array<PlaylistType>>(Array);

  useEffect(() => {
    (async () => {
      const playListIDs = [
        '37i9dQZF1DWXRqgorJj26U',
        '37i9dQZF1DWWGFQLoP9qlv',
        '37i9dQZEVXbKCF6dqVpDkS',
      ];
      try {
        setLoading(true);
        setError('');
        const accessToken = await retrieveToken();
        const playlistData = await Promise.all(
          playListIDs.map((id) => retrievePlaylist(id, accessToken)),
        );
        setPlaylists(playlistData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={style.widget}>
      {error && <p className="error-message">{error}</p>}
      {loading && <LoadingSpinner />}
      {!error && !loading && playlists.map((playlist: PlaylistType) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default SpotifyWidget;
