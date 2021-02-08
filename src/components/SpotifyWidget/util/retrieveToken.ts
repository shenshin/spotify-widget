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
export default retrieveToken;
