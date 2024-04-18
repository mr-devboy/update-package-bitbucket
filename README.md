# update-package-bitbucket

Script that updates package.json in BitBucket repo and opens a pull request using prompt interface.

# Usage

Clone repository.

Install node modules: `npm install`

Run: `npm run start` or `node /dist/index.js` and follow CLI instructions.

# Development

Run nodemon watcher: `npm run dev`

Eslint and prettier checks:
`npm run eslint`
`npm run prettier`

Eslint and prettier fixes: `npm run eslint:fix` `npm run prettier:fix`

Build project: `npm run build`

Project structure:

`/src` — source folder.

`/dist` — output folder.

`/src/api` — there are files for work with bitbucket and git APIs.

`/src/prompt` — there are files for creating prompt interaction and grabbing necessary input data like `    username,
    password,
    workspaceName,
    repositoryName,
    packageName,
    packageVersion`

`/src/typings.ts and /src/helpers` — utilities files.

`/src/bumpPackage` — logic for recursively search package.json files and updating package version in them.

`/src/index` — entry point and the orchestrator of the app.

# How it works:

All interaction with bitbucket made with `bitbucket` package. All git manipulation made with `simple-git` package. CLI prompt interaction made with `inquirer`.

1. User provide credentials, package name and next version of package, choose remote workspace and repository.
2. Cloning selected Repository to `/.temp` folder.
3. Creating and switch local git branch in cloned repository.
4. Updating package version in all founded `package.json` files.
5. Committing, pushing to origin and creating PR to `main` branch (hardcoded for now).

# To Do

- let user select of destination branch
- save authorization credentials in a safe way
- let user provide bitbucket authorization by token
- semver validation
- errors handling
