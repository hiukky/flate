import fs from 'fs'
import { ScssTool } from '@flate/colors'
import {
  IBaseBuilder,
  TSetting,
  TTheme,
  TBaseProps,
  TCreateFile,
  TRootDir,
} from '.'

export class BaseBuilder implements IBaseBuilder {
  readonly rootDir: TRootDir

  public settings: TSetting = {
    fileType: 'json',
  }

  public scss = new ScssTool()

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
   * Load any file with theme specifications.
   *
   * @param {String} pathFile
   */
  getFile(pathFile: string): string {
    return fs.readFileSync(pathFile, 'utf8').toString()
  }

  /**
   * @method getFileJSON
   *
   * Loads the JSON file with theme specifications.
   *
   * @param {String} pathFile
   */
  getFileJSON(pathFile: string): Object {
    return JSON.parse(this.getFile(pathFile))
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
      fs.mkdirSync(path, { recursive: true })
    }

    fs.writeFileSync(
      `${path}/${fileName}`,
      typeof file === 'string' ? file : JSON.stringify(file),
      {
        encoding: 'utf8',
      },
    )

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
      ([nameColor, color]: any) => {
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
