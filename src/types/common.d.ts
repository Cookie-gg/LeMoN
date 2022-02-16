// article type
export interface Zenn {
  id?: string;
  articleId: string;
  published: boolean;
  releaseDate: number;
  title: string;
  emoji: string;
  type: string;
  topics: string[];
}
export interface ZennAdds {
  updateDate: number;
  icons: string[];
  markdown: string;
  html: string;
  headings?: {
    level: 1 | 2;
    text: string;
  }[];
  relations: {
    articles: Zenn[];
  };
}

// monaco type
import * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
export type MonacoEditorType = Monaco.editor.IStandaloneCodeEditor | null;

// middleware type
import type { NextFetchEvent, NextRequest } from 'utils/libs/next';
export type Middleware = (
  request: NextRequest,
  event: NextFetchEvent,
) => Promise<Response | undefined> | Response | undefined | void;
