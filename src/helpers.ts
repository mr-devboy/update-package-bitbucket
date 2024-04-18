export function generateRepositoryDirName(repositoryName: string) {
  return `.temp/${repositoryName}`
}

export function generateBranchName(name: string, version: string) {
  return `${name}/v${version.replace(/^\D+/g, "")}`
}

export function removeRootDirFromPath(root: string, path: string) {
  return path.replace(root + "/", "")
}
