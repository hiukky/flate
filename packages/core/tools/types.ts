export type TObject<T> = {
  [k: string]: T
}

export type TRootDir = {
  themes: string
  build: string
}

export type TTheme = {
  stage: TObject<any>
  final: TObject<any>
  variants: TObject<any>[]
}

export type TSetting = {
  fileType: 'json'
}

export type TCreateFile = {
  path: string
  file: TObject<any>
  fileName: string
}
export type TBuildProps = {
  rootDir: TRootDir
}

export interface IBuild {
  rootDir: TRootDir
  theme: TTheme
  settings: TSetting
  stage(): void
  compile(): void
}

export interface IScss {
  read(path: string): string
  parse(file: string): object
  toJSON(path: string, fileName: string): object
  getColors(variant: string): object
}
