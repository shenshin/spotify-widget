const Track = ({ track }: any) => {
  const { name, artists } = track;
  const artistList = artists.map((artist: any) => artist.name).join(', ');
  return (
    <li>
      {`${artistList} — «${name}»`}
    </li>
  );
};

export default Track;
