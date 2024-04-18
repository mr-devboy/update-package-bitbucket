import { Bitbucket } from "bitbucket"
import type { AuthBasic } from "bitbucket/src/plugins/auth/types"

export async function createBitbucketAPI({ username, password }: AuthBasic) {
  const bitbucket = await new Bitbucket({
    auth: {
      username,
      password,
    },
  })

  const getWorkspaces = async () => {
    try {
      console.log("ℹ︎ fetch workspaces")
      return await bitbucket.workspaces
        .getWorkspaces({})
        .then(({ data: { values } }) => values?.map(({ slug }) => slug!) || [])
    } catch (e) {
      console.error("fetch workspaces error!", e)
    }
  }

  const getRepositories = async (workspaceName: string) => {
    try {
      console.log("ℹ︎ fetch repositories")
      return await bitbucket.repositories
        .list({
          workspace: workspaceName,
          pagelen: 100, // TODO: pagination
        })
        .then(({ data: { values } }) => values?.map(({ slug }) => slug!) || [])
    } catch (e) {
      console.error("fetching repositories error!", e)
    }
  }

  const createPullRequest = async ({
    workspaceName,
    repositoryName,
    title,
    branch,
  }: {
    workspaceName: string
    repositoryName: string
    title: string
    branch: string
  }) => {
    try {
      console.log("ℹ︎ creating pull request")
      await bitbucket.repositories.createPullRequest({
        _body: {
          type: "",
          title: title,
          source: {
            branch: {
              name: branch,
            },
          },
          destination: {
            branch: {
              name: "main", // TODO: ask destination in user
            },
          },
        },
        repo_slug: repositoryName,
        workspace: workspaceName,
      })
      console.log("ℹ︎ pull request created")
    } catch (e) {
      console.error("creating pull request error!", e)
    }
  }

  return {
    getWorkspaces,
    getRepositories,
    createPullRequest,
  }
}
