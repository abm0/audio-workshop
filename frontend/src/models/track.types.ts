export type Track = {
  id: string;
  title: string;
  tempo?: number;
  key?: string;
  source_file?: string;
  vocals_file?: string;
  backing_track_file?: string;
};

export type TracksStore = {
  byId: Record<string, Track>;
};

export type TrackUpdatePayload = {
  userId: string;
  id: string;
  title: string;
};

export type TrackUpdateResponse = {
  id: string,
  user_id: string,
  title: string;
};

export type TrackDeletePayload = {
  id: string;
};

export type TrackProcessPayload = {
  id: string;
};
