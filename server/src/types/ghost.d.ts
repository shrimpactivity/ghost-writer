export interface Ghost {
  id: number;
  gutenbergId?: string;
  title: string;
  author?: string;
  data: Uint8Array | string;
}