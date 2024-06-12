export type Track = {
  song: string;
  file: string;
  extension: string;
  type: string;
}

export type Song = {
  id: string;
  title: string;
  tempo: number;
  key: string;
  source_tracks: Track[];
  vocals_tracks: Track[];
  backing_tracks: Track[];
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
