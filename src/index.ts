import { generateAppData } from "./prompt"
import * as git from "./api/git"
import bumpPackage from "./bumpPackage"
import { generateBranchName, generateRepositoryDirName } from "./helpers"

// TODO: errors handling
// TODO: write common error handler/logging

async function app() {
  const {
    username,
    password,
    workspaceName,
    repositoryName,
    packageName,
    packageVersion,
    bitbucketAPI,
  } = await generateAppData()

  const branch = generateBranchName(packageName, packageVersion)
  const repositoryDirName = generateRepositoryDirName(repositoryName)
  const pullRequestTitle = `bump ${packageName} to ${packageVersion}`
  const commitMessage = `[chore]: ${pullRequestTitle}`

  await git.clone({
    username,
    password,
    workspaceName,
    repositoryName,
    repositoryDirName,
    branch,
  })

  const { updatedFilesPaths } = await bumpPackage({
    repositoryDirName,
    packageName,
    packageVersion,
  })

  await git.commit({
    files: updatedFilesPaths,
    repositoryDirName,
    message: commitMessage,
  })

  await git.push({
    repositoryDirName,
    branch,
  })

  bitbucketAPI.createPullRequest({
    workspaceName,
    repositoryName,
    title: pullRequestTitle,
    branch,
  })
}

app()
