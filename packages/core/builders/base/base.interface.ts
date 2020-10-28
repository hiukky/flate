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
  file: TObject<any> | string
  fileName: string
}
export type TBaseProps = {
  rootDir: TRootDir
}

export interface IBaseBuilder {
  theme: TTheme
  settings: TSetting
  listThemes: string[]
  getFile(pathFile: string): string
  getFileJSON(pathFile: string): Object
  createFile(props: TCreateFile): string
  setColors(): this
}

export interface IBuilderCommon {
  createVariants(): string
  merge(theme: any): void
  stage(): void
  compile(): string
}
