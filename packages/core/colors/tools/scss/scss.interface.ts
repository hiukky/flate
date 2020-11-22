export interface IScss {
  read(path: string): string
  toJSON(file: string): object
  resolve(path: string, fileName: string): object
  getColors(path: string | null, variant: string): object
}

export type TColorsNames =
  | '$green'
  | '$beige'
  | '$purple'
  | '$cyan'
  | '$blue'
  | '$red'
  | '$yellow'
  | '$grey'
  | '$orange'
  | '$pink'
  | '$quince'
  | '$spiced'
  | '$squash'
  | '$blush'
  | '$white'
  | '$black'
  | '$primaryColor'
  | '$secondaryColor'

export type TColors = Record<TColorsNames, string>
