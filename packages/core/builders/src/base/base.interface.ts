export type TObject<T> = {
  [k: string]: T
}

export type TFileType = 'json' | 'yml' | 'conf'

export type TExtensions = {
  [k in TFileType]: string
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
  extensions: TExtensions
  listThemes: string[]
  getFile<T = any>(pathFile: string): T
  parseFile<T = any>(data: string, scheme?: TFileType): T
  createFile(props: TCreateFile): string
  setColors(): this
}

export interface IBuilderCommon {
  createVariants(): string
  merge(theme: any): void
  stage(): void
  compile(): string
}
