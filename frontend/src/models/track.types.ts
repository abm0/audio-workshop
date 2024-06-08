export type Track = {
  id: string;
  title: string;
  bpm?: number;
  key?: string;
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
