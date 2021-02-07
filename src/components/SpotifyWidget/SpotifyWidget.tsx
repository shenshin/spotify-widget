import React, { useState, useEffect } from 'react';
import style from './SpotifyWidget.module.scss';
import Playlist from './Playlist/Playlist';
import PlaylistType from './Playlist/PlaylistType';

async function retrieveToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
    body: 'grant_type=client_credentials',
  });
  if (!response.ok) throw new Error(`Error retrieving token: ${response.statusText}`);
  const { access_token: tokenData } = await response.json();
  return tokenData;
}

async function retrievePlaylist(playlistID: string, accessToken: string) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error(`Error retrieving playlist: ${response.statusText}`);
  return response.json();
}

const SpotifyWidget = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      {loading && <p>Loading...</p>}
      {!error && !loading && playlists.map((playlist: PlaylistType) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default SpotifyWidget;
