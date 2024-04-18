export type IPackage = {
  packageName: string
  packageVersion: string
}

export type IPackageJSONLike = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}
