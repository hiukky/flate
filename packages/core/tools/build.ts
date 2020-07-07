import fs from 'fs'

import { IBuild, TRootDir, TCreateFile, TTheme } from './types'

class Build implements IBuild {
  readonly rootDir: TRootDir
  public theme: TTheme = {}

  /**
   * @constructor
   *
   * @param {TRootDir} rootDir
   */
  constructor(rootDir: TRootDir) {
    this.rootDir = rootDir
  }

  /**
   * @method listThemes
   *
   * List all themes in a directory.
   */
  get listThemes(): string[] {
    return fs
      .readdirSync(this.rootDir.themes)
      .filter(theme => theme.match(/\.[0-9a-z]+$/i))
  }

  /**
   * @method getBaseTheme
   *
   * Obtains the basic theme of each implementation.
   */
  get getBaseTheme(): object {
    return this.getFile(`${this.rootDir.themes}/common/base.json`)
  }

  /**
   * @method getFile
   *
   * Loads the JSON file with theme specifications.
   *
   * @param {String} pathFile
   */
  getFile(pathFile: string): object {
    return JSON.parse(fs.readFileSync(pathFile, 'utf8'))
  }

  /**
   * @method createFile
   *
   * Creates the compiled theme.
   *
   * @param {TCreateFile} options
   * @param {String} options.path
   * @param {String} options.file
   * @param {String} options.fileName
   */
  createFile({ path, file, fileName }: TCreateFile): void {
    fs.readdir(path, error => {
      if (error) fs.mkdirSync(path)
    })

    fs.writeFile(`${path}/${fileName}`, JSON.stringify(file), error => {
      if (error) return
    })
  }

  /**
   * @method stage
   *
   * Stage method where the finishing touches are applied.
   *
   * @param {Function} callback
   */
  stage(cb: (theme: any) => object): this {
    this.listThemes.map(
      themeName =>
        (this.theme[themeName] = cb(
          Object.assign(
            {},
            this.getBaseTheme,
            this.getFile(`${this.rootDir.themes}/${themeName}`),
          ),
        )),
    )

    return this
  }

  /**
   * @method compile
   *
   * Responsible for the construction.
   */
  compile(): void {
    if (this.theme) {
      Object.entries(this.theme).map(([name, theme]) =>
        this.createFile({
          path: this.rootDir.build,
          file: theme,
          fileName: name,
        }),
      )
    }
  }
}

export default Build
