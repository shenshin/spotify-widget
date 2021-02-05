import React, { useState, useEffect, useCallback } from 'react';
import Playlist from './Playlist';

const Widget = ({ playListIDs }: { playListIDs: string[] }) => {
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState(Array);

  const retrieveToken = async () => {
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
    return tokenData.access_token;
  };

  const retrievePlaylist = useCallback(async (playlist: string) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${await retrieveToken()}`,
      },
    });
    if (!response.ok) throw new Error(`Error retrieving playlist: ${response.statusText}`);
    return response.json();
  }, []);

  const getPlaylistData = useCallback(async () => {
    try {
      setError('');
      const playlistData = await Promise.all(playListIDs.map((id) => retrievePlaylist(id)));
      setPlaylists(playlistData);
    } catch (err) {
      setError(err.message);
    }
  }, [playListIDs, retrievePlaylist]);

  useEffect(() => {
    getPlaylistData();
  }, [getPlaylistData]);

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && playlists.map((playlist: any) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </>
  );
};

export default Widget;
