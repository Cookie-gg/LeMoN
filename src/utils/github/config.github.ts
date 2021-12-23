import { Octokit as Github } from '@octokit/rest';

export interface GithubTypes {
  content: string;
  download_url: string | null;
  encoding: string;
  git_url: string | null;
  html_url: string | null;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
  _links: {
    git: string;
    html: string;
    self: string;
  };
}

export const github = new Github({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});
