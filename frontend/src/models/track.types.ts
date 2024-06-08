export type Track = {
  id: string;
  title: string;
  bpm: number | null;
  key: string | null;
};

export type TracksStore = Track[]

export type UpdateTrackPayload = {
  userId: string;
  id: string;
  title: string;
};