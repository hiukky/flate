import fs from 'fs'
import { ScssTool } from '@flate/colors'
import { EXTENSIONS } from '../constants'
import {
  IBaseBuilder,
  TTheme,
  TBaseProps,
  TCreateFile,
  TRootDir,
  TExtensions,
  TFileType,
} from '.'

export class BaseBuilder implements IBaseBuilder {
  readonly rootDir: TRootDir

  public extensions: TExtensions = EXTENSIONS

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
   * @method parseFile
   *
   * Parsing a file search result.
   *
   * @param {unknown} scheme
   * @param {TFileType} scheme
   */
  parseFile<T = string>(data: string, scheme?: TFileType): T {
    switch (scheme) {
      case 'json':
        return JSON.parse(data)
      default:
        return (data.toString() as unknown) as T
    }
  }

  /**
   * @method getFile
   *
   * Load any file with theme specifications.
   *
   * @param {String} pathFile
   */
  getFile<T = any>(pathFile: string): T {
    const extension = pathFile.split(/\.(?=[^.]+$)/)[1] as TFileType

    return this.parseFile<T>(
      fs.readFileSync(pathFile, 'utf8').toString(),
      extension,
    )
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
