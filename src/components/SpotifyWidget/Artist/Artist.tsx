const Artist = ({ artist }: { artist: any }) => {
  const { images, name } = artist;
  const randomIndex = Math.floor(Math.random() * images.length);
  const { url: randomImageURL } = images[randomIndex];
  return (
    <div>
      <img src={randomImageURL} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Artist;
