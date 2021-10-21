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
  published: boolean;
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
  };
}
import * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

export type MonacoEditorType = Monaco.editor.IStandaloneCodeEditor | null;
