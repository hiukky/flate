import fs from 'fs'

import SCSS from './scss'

import {
  IBuild,
  TRootDir,
  TCreateFile,
  TTheme,
  TSetting,
  TBuildProps,
} from './types'

class Build implements IBuild {
  readonly rootDir: TRootDir

  public scss = new SCSS()

  public settings: TSetting = {
    fileType: 'json',
  }

  public theme: TTheme = {
    stage: {},
    final: {},
    variants: [],
  }

  /**
   * @constructor
   *
   * @param {TRootDir} rootDir
   */
  constructor({ rootDir }: TBuildProps) {
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
  static getFile(pathFile: string): object {
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
   * @method createVariants
   *
   * Create new variant.
   */
  createVariants(): void {
    if (this.theme.variants.length) {
      this.theme.variants.forEach(theme => {
        this.theme.final[
          `${theme.variant}.${
            theme.fontStyle
              ? `${theme.fontStyle}.${this.settings.fileType}`
              : this.settings.fileType
          }`
        ] = theme
      })
    } else {
      this.theme.final[
        `${this.theme.stage.variant}.${this.settings.fileType}`
      ] = this.theme.stage
    }
  }

  /**
   * @method setColors
   *
   * I defined all colors based on the declared variables.
   */
  setColors(): this {
    const theme = this.theme.stage

    Object.entries(this.scss.getColors(theme.variant)).forEach(
      ([nameColor, color]) => {
        this.theme.stage = JSON.parse(
          JSON.stringify(this.theme.stage).replace(
            new RegExp(`\\${nameColor}`, 'g'),
            color,
          ),
        )
      },
    )

    return this
  }

  /**
   * @method setFontStyle
   *
   * Creates different variants with different font styles.
   */
  setFontStyles(): this {
    let theme = this.theme.stage

    if (theme.fontStyle) {
      Object.values(theme.fontStyle).forEach((fontStyle: any) => {
        theme = {
          ...theme,
          tokenColors: theme.tokenColors.map((token: any) => ({
            ...token,
            settings: {
              ...token.settings,
              fontStyle: fontStyle === 'none' ? '' : fontStyle,
            },
          })),
          fontStyle: fontStyle === 'none' ? '' : fontStyle,
        }

        this.theme.variants.push(theme)
      })
    }

    return this
  }

  /**
   * @method mergeColors
   *
   * Replace all colors.
   *
   * @param {any} theme
   */
  merge(theme: any): void {
    this.theme.stage = theme
    this.setColors().setFontStyles().createVariants()
  }

  /**
   * @method stage
   *
   * Stage method where the finishing touches are applied.
   *
   * @param {Function} callback
   */
  stage(): void {
    this.listThemes.forEach(themeName => {
      this.merge({
        ...Build.getFile(`${this.rootDir.themes}/common/base.json`),
        ...Build.getFile(`${this.rootDir.themes}/${themeName}`),
      })
    })
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
