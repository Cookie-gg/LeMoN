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

export interface Zenn {
  id: string;
  releaseDate: Date;
  title: string;
  emoji: string;
  type: string;
  topics: string[];
}

export interface ZennAdds {
  updateDate: Date;
  icons: string[];
  body: string;
  headings?: {
    level: 1 | 2;
    text: string;
  }[];
  relations: {
    articles: Zenn[];
    title: string;
  };
}
