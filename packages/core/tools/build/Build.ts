import fs from 'fs'
import {
  IBuild,
  TRootDir,
  TTheme,
  TSetting,
  TBaseProps,
  TCreateFile,
} from './types'

import { Scss } from '../scss'

export default class Build implements IBuild {
  readonly rootDir: TRootDir

  public settings: TSetting = {
    fileType: 'json',
  }

  public scss = new Scss()

  public theme: TTheme = {
    stage: {},
    final: {},
    variants: [],
  }

  /**
   * @constructor
   *
   * @param {TBaseProps} props
   */
  constructor({ rootDir }: TBaseProps) {
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
  createFile({ path, file, fileName }: TCreateFile): string {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(file), {
      encoding: 'utf8',
    })

    return 'created'
  }

  /**
   * @method setColors
   *
   * I defined all colors based on the declared variables.
   */
  setColors(): this {
    const theme = this.theme.stage

    Object.entries(this.scss.getColors(null, theme.variant)).forEach(
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
}
