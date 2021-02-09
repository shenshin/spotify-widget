const Artist = ({ name, imageURLs }: {
  name: string,
  imageURLs: string[],
}): JSX.Element => {
  const randomIndex: number = Math.floor(Math.random() * imageURLs.length);
  return (
    <div>
      <img src={imageURLs[randomIndex]} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Artist;
