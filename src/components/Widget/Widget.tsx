import React, { useState, useEffect, useCallback } from 'react';
import style from './Widget.module.scss';
import Playlist from './Playlist/Playlist';

const Widget = () => {
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState(Array);

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
    const tokenData = await response.json();
    setToken(tokenData.access_token);
  }

  const retrievePlaylist = useCallback(async (playlist: string) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`Error retrieving playlist: ${response.statusText}`);
    return response.json();
  }, [token]);

  useEffect(() => {
    (async () => {
      const playListIDs = [
        '37i9dQZF1DWXRqgorJj26U',
        '37i9dQZF1DWWGFQLoP9qlv',
        '37i9dQZEVXbKCF6dqVpDkS',
      ];
      try {
        setError('');
        await retrieveToken();
        const playlistData = await Promise.all(playListIDs.map((id) => retrievePlaylist(id)));
        setPlaylists(playlistData);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [retrievePlaylist]);

  return (
    <div className={style.widget}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && playlists.map((playlist: any) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default Widget;
