export type TRootDir = {
  themes: string
  build: string
}

export type TTheme = {
  stage: string
  final: { [k: string]: object }
}

export type TCreateFile = {
  path: string
  file: object
  fileName: string
}

export interface IBuild {
  rootDir: TRootDir
  getFile(path: string): object
  stage(cb: (theme: any) => object): this
  compile(): void
}

export interface IScss {
  read(path: string): string
  parse(file: string): object
  toJSON(path: string, fileName: string): object
  getColors(variant: string): object
}
