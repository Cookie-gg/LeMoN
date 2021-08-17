interface GetCMS {
  createdAt: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
}
interface PostCMS {
  post: string;
}
export type CMSTypes<T> = T extends 'get' ? GetCMS : PostCMS;

export interface ZennTypes {
  id: string;
  releaseDate: Date;
  title: string;
  emoji: string;
  type: string;
  topics: string[];
}
