const Artist = ({ name, imageURLs }: {
  name: string,
  imageURLs: string[],
}) => {
  const randomIndex = Math.floor(Math.random() * imageURLs.length);
  return (
    <div>
      <img src={imageURLs[randomIndex]} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Artist;
