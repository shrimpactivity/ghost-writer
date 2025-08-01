export interface Ghost {
  id: number;
  gutenbergId?: number;
  title: string;
  author?: string;
  data: Uint8Array | string;
  local: boolean;
}