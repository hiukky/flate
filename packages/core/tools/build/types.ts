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
export type TBaseProps = {
  rootDir: TRootDir
}

export interface IBuild {
  rootDir: TRootDir
  theme: TTheme
  settings: TSetting
  listThemes: string[]
  getFile(pathFile: string): object
  createFile(props: TCreateFile): string
  setColors(): this
}

export interface IBuildCommon {
  createVariants(): string
  merge(theme: any): void
  stage(): void
  compile(): string
}

export interface IBuildCode extends IBuildCommon {
  setFontStyles(): this
  createVariants(): string
}

export interface IBuildInsomnia extends IBuildCommon {}
