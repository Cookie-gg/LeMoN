import { github, GithubTypes } from './config.github';

export async function getFile(
  path: string,
  repo = 'zenn-content',
  owner = `${process.env.NEXT_PUBLIC_GITHUB_OWNER}`,
): Promise<GithubTypes> {
  const content = await github.request('GET /repos/{owner}/{repo}/contents/{path}', { owner, repo, path });
  return content.data as GithubTypes;
}
