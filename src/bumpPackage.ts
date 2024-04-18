import fs from "node:fs"
import path from "node:path"
import type { IPackage, IPackageJSONLike } from "./typings"
import { removeRootDirFromPath } from "./helpers"

const getPackageJsonFilesPaths = (dir: string): string[] => {
  const paths = []

  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const isDirectory = fs.statSync(filePath).isDirectory()

    if (isDirectory) {
      paths.push(...getPackageJsonFilesPaths(filePath))
    } else if (file === "package.json") {
      paths.push(filePath)
    }
  }
  return paths
}

export default function bumpPackage({
  packageName,
  packageVersion,
  repositoryDirName,
}: {
  repositoryDirName: string
} & IPackage) {
  const packageJsonFilesPaths = getPackageJsonFilesPaths(repositoryDirName)
  const updatedFilesPaths: string[] = []

  packageJsonFilesPaths.forEach((packageJsonPath) => {
    console.log("ℹ︎ read package.json")
    const file = fs.readFileSync(packageJsonPath, "utf8")

    let fileObject

    try {
      console.log("ℹ︎ parse package.json")
      fileObject = JSON.parse(file) as IPackageJSONLike
    } catch (e) {
      console.error("package.json corrupted!", e)
    }
    let isFileUpdated = false

    if (
      fileObject?.dependencies?.[packageName] &&
      fileObject.dependencies[packageName] !== packageVersion
    ) {
      fileObject.dependencies[packageName] = packageVersion
      isFileUpdated = true
    }

    if (
      fileObject?.devDependencies?.[packageName] &&
      fileObject.devDependencies[packageName] !== packageVersion
    ) {
      fileObject.devDependencies[packageName] = packageVersion
      isFileUpdated = true
    }

    if (isFileUpdated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(fileObject, null, 2))
      updatedFilesPaths.push(
        removeRootDirFromPath(repositoryDirName, packageJsonPath)
      )
      console.log("ℹ︎ package.json files updated")
    } else {
      console.log("ℹ︎ package.json files not found")
    }
  })

  return { updatedFilesPaths }
}
