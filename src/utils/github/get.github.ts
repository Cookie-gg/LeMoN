import { github, GithubTypes } from './config.github';

export async function getFile(
  path: string,
  owener = 'Cookie-gg',
  repo = 'zenn-content',
): Promise<GithubTypes> {
  const content = await github.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: owener,
    repo: repo,
    path: path,
  });
  return content.data as GithubTypes;
}
