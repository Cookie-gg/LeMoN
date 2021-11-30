import { Base64 } from 'js-base64';
import { github, GithubTypes } from './config.github';

export async function createFile(
  path: string,
  data: {
    title: string;
    emoji: string;
    type: string;
    topics: string[];
    published: boolean;
    markdown: string;
  },
  owener = `${process.env.NEXT_PUBLIC_GITHUB_OWNER}`,
  repo = 'zenn-content',
) {
  await github.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: owener,
    repo: repo,
    path: path,
    message: `Create ${path}`,
    content: Base64.encode(
      '---\n' +
        `title: ${data.title}\n` +
        `emoji: ${data.emoji}\n` +
        `type: ${data.type}\n` +
        `topics: ${JSON.stringify(data.topics)}\n` +
        `published: ${data.published}\n` +
        '---\n' +
        `${data.markdown}\n`,
    ),
  });
}

export async function updateFile(
  path: string,
  data: {
    title: string;
    emoji: string;
    type: string;
    topics: string[];
    published: boolean;
    markdown: string;
  },
  owner = `${process.env.NEXT_PUBLIC_GITHUB_OWNER}`,
  repo = 'zenn-content',
) {
  const sha = (
    (
      await github.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: owner,
        repo: repo,
        path: path,
        message: `Get ${path}`,
      })
    ).data as GithubTypes
  ).sha;
  await github.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: owner,
    repo: repo,
    path: path,
    message: `Update ${path}`,
    sha: sha,
    content: Base64.encode(
      '---\n' +
        `title: ${data.title}\n` +
        `emoji: ${data.emoji}\n` +
        `type: ${data.type}\n` +
        `topics: ${JSON.stringify(data.topics)}\n` +
        `published: ${data.published}\n` +
        '---\n' +
        `${data.markdown}\n`,
    ),
  });
}

export async function deleteFile(
  path: string,
  owener = `${process.env.NEXT_PUBLIC_GITHUB_OWNER}`,
  repo = 'zenn-content',
) {
  const sha = (
    (
      await github.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: owener,
        repo: repo,
        path: path,
        message: `Get ${path}`,
      })
    ).data as GithubTypes
  ).sha;
  await github.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
    owner: owener,
    repo: repo,
    path: path,
    message: `Delete ${path}`,
    sha: sha,
  });
}
