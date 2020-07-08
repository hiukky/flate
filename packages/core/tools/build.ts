import fs from 'fs'

import SCSS from './scss'

import { IBuild, TRootDir, TCreateFile, TTheme } from './types'

class Build extends SCSS implements IBuild {
  readonly rootDir: TRootDir

  public theme: TTheme = {
    stage: '',
    final: {},
  }

  /**
   * @constructor
   *
   * @param {TRootDir} rootDir
   */
  constructor(rootDir: TRootDir) {
    super()
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
  static createFile({ path, file, fileName }: TCreateFile): void {
    fs.readdir(path, error => {
      if (error) fs.mkdirSync(path)
    })

    fs.writeFile(`${path}/${fileName}`, JSON.stringify(file), error => {
      if (error) throw error
    })
  }

  /**
   * @method mergeColors
   *
   * Replace all colors.
   *
   * @param {any} theme
   */
  mergeColors(theme: any): this {
    this.theme.stage = JSON.stringify(theme)

    Object.entries(this.getColors(theme.variant)).flatMap(
      ([nameColor, color]) => {
        this.theme.stage = this.theme.stage.replace(
          new RegExp(`\\${nameColor}`, 'g'),
          color,
        )

        return true
      },
    )

    return this
  }

  /**
   * @method stage
   *
   * Stage method where the finishing touches are applied.
   *
   * @param {Function} callback
   */
  stage(): this {
    this.listThemes.map(themeName => {
      this.mergeColors({
        ...this.getFile(`${this.rootDir.themes}/common/base.json`),
        ...this.getFile(`${this.rootDir.themes}/${themeName}`),
      })

      this.theme.final[themeName] = JSON.parse(this.theme.stage)

      return themeName
    })

    return this
  }

  /**
   * @method compile
   *
   * Responsible for the construction.
   */
  compile(): void {
    this.stage()

    if (this.theme.final) {
      Object.entries(this.theme.final).map(([name, theme]) =>
        Build.createFile({
          path: this.rootDir.build,
          file: theme,
          fileName: name,
        }),
      )
    }
  }
}

export default Build
