import { github, GithubTypes } from './config.github';

export async function getFile(
  owener = 'Cookie-gg',
  repo = 'zenn-content',
  path: string,
): Promise<GithubTypes> {
  const content = await github.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: owener,
    repo: repo,
    path: path,
  });
  return content.data as GithubTypes;
}
