import ArtistType from '../Artist/ArtistType';

export interface TrackType {
  id: string;
  name: string;
  artists: ArtistType[];
}
export default TrackType;
