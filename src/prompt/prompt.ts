import inquirer from "inquirer"
import { createBitbucketAPI } from "../api/bitbucket"
import {
  packageQuestions,
  authQuestions,
  repositoryQuestion,
  workspaceQuestion,
} from "./config"
import type { IPackage } from "../typings"
import { AuthBasic } from "bitbucket/src/plugins/auth/types"

export async function generateAppData() {
  // TODO: remember credentials
  const { username, password } = await inquirer.prompt<AuthBasic>(authQuestions)
  //TODO: provide auth by token
  const bitbucketAPI = await createBitbucketAPI({ username, password })

  const { packageName, packageVersion } =
    await inquirer.prompt<IPackage>(packageQuestions)

  const { workspaceName } = await inquirer.prompt<{
    workspaceName: string
  }>([
    {
      ...workspaceQuestion,
      choices: await bitbucketAPI.getWorkspaces(),
    },
  ])

  const { repositoryName } = await inquirer.prompt<{
    repositoryName: string
  }>([
    {
      ...repositoryQuestion,
      choices: await bitbucketAPI.getRepositories(workspaceName),
    },
  ])

  return {
    username,
    password,
    packageName,
    packageVersion,
    workspaceName,
    repositoryName,
    bitbucketAPI,
  }
}
