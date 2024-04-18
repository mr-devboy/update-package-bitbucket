import type { QuestionCollection, DistinctQuestion } from "inquirer"

export const packageQuestions: QuestionCollection = [
  {
    type: "input",
    name: "packageName",
    message: "Enter name of package:",
    validate(value) {
      if (value) return true

      return "name can't be empty"
    },
  },
  {
    type: "input",
    name: "packageVersion",
    message: "Enter necessary version of package:",
    validate(value) {
      // TODO: make semver validation here,
      if (value) return true
      return "version can't be empty"
    },
  },
]

export const authQuestions: QuestionCollection = [
  {
    type: "input",
    name: "username",
    message: "Enter Bitbucket username:",
  },
  {
    type: "password",
    name: "password",
    message: "Enter Bitbucket password:",
  },
]

export const workspaceQuestion: DistinctQuestion = {
  type: "list",
  name: "workspaceName",
  message: "Select workspace",
}

export const repositoryQuestion: DistinctQuestion = {
  type: "list",
  name: "repositoryName",
  message: "Select repository",
}
