import fs from "node:fs"
import { simpleGit } from "simple-git"
import type { AuthBasic } from "bitbucket/src/plugins/auth/types"

export async function clone({
  username,
  password,
  workspaceName,
  repositoryName,
  repositoryDirName,
  branch,
}: AuthBasic & {
  workspaceName: string
  repositoryDirName: string
  repositoryName: string
  branch: string
}) {
  try {
    console.log("ℹ︎ cloning repository")
    const origin = `https://${username}:${password}@bitbucket.org/${workspaceName}/${repositoryName}.git`
    if (fs.existsSync(repositoryDirName)) {
      fs.rmSync(repositoryDirName, { recursive: true, force: true })
    }

    await simpleGit().clone(origin, repositoryDirName)
    await simpleGit(repositoryDirName).checkoutLocalBranch(branch)
  } catch (e) {
    console.error("cloning repository error!", e)
  }
}

export async function commit({
  files,
  repositoryDirName,
  message,
}: {
  files: string[]
  repositoryDirName: string
  message: string
}) {
  try {
    console.log("ℹ︎ commit repository")
    await simpleGit(repositoryDirName).add(files).commit(message)
  } catch (e) {
    console.log("commit repository error!", e)
  }
}

export async function push({
  repositoryDirName,
  branch,
}: {
  repositoryDirName: string
  branch: string
}) {
  try {
    console.log("ℹ︎ pushing repository")
    await simpleGit(repositoryDirName).push("origin", branch)
  } catch (e) {
    console.log("pushing repository error!", e)
  }
}
