import TrackType from '../Track/TrackType';

export interface PlaylistType {
  id: string;
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  tracks: {
    items: {
      track: TrackType;
    }[];
  };
}
export default PlaylistType;
