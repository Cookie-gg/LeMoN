import { Base64 } from 'js-base64';
import { github, GithubTypes } from './config.github';

export async function createFile(
  path: string,
  message: string,
  owener = 'Cookie-gg',
  repo = 'zenn-content',
  data: {
    title: string;
    emoji: string;
    type: string;
    topic: string[];
    published: boolean;
    content: string;
  },
) {
  await github.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: owener,
    repo: repo,
    path: path,
    message: message,
    content: Base64.encode(
      '---\n' +
        `title: ${data.title}\n` +
        `emoji: ${data.emoji}\n` +
        `type: ${data.type}\n` +
        `topic: [${data.topic.map((el) => `"${el}"`)}]\n` +
        `published: ${data.published}\n` +
        '---\n' +
        `${data.content}\n`,
    ),
  });
}

export async function updateFile(
  path: string,
  message: string,
  owener = 'Cookie-gg',
  repo = 'zenn-content',
  data: {
    title: string;
    emoji: string;
    type: string;
    topic: string[];
    published: boolean;
    content: string;
  },
) {
  const sha = (
    (
      await github.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: owener,
        repo: repo,
        path: path,
        message: message,
      })
    ).data as GithubTypes
  ).sha;
  await github.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: owener,
    repo: repo,
    path: path,
    message: message,
    sha: sha,
    content: Base64.encode(
      '---\n' +
        `title: ${data.title}\n` +
        `emoji: ${data.emoji}\n` +
        `type: ${data.type}\n` +
        `topic: [${data.topic.map((el) => `"${el}"`)}]\n` +
        `published: ${data.published}\n` +
        '---\n' +
        `${data.content}\n`,
    ),
  });
}

export async function deleteFile(
  path: string,
  message: string,
  owener = 'Cookie-gg',
  repo = 'zenn-content',
  data: {
    title: string;
    emoji: string;
    type: string;
    topic: string[];
    published: boolean;
    content: string;
  },
) {
  const sha = (
    (
      await github.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: owener,
        repo: repo,
        path: path,
        message: message,
      })
    ).data as GithubTypes
  ).sha;
  await github.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
    owner: owener,
    repo: repo,
    path: path,
    message: message,
    sha: sha,
    content: Base64.encode(
      '---\n' +
        `title: ${data.title}\n` +
        `emoji: ${data.emoji}\n` +
        `type: ${data.type}\n` +
        `topic: [${data.topic.map((el) => `"${el}"`)}]\n` +
        `published: ${data.published}\n` +
        '---\n' +
        `${data.content}\n`,
    ),
  });
}
