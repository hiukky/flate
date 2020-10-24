export interface IScss {
  read(path: string): string
  toJSON(file: string): object
  resolve(path: string, fileName: string): object
  getColors(path: string | null, variant: string): object
}
