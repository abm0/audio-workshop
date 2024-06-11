export type Song = {
  id: string;
  title: string;
  tempo: number;
  key: string;
  source_track: string;
  vocals_track: string;
  backing_track: string;
};

export type SongsStore = {
  byId: Record<string, Song>;
};

export type SongUploadFxPayload = {
  title: string;
  sourceFile: string | Blob;
};

export type SongDeleteRequestPayload = {
  id: string;
};
