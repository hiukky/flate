import fs from 'fs'
import { resolve } from 'path'
import { IScss, TColors, TColorsNames } from './scss.interface'

export class ScssTool implements IScss {
  /**
   * @function colorDirectory
   *
   * @desc Get the directory of scss files with color scheme.
   */
  get colorDirectory(): string {
    return resolve(__dirname, '..', '..', 'scss')
  }

  /**
   * @method read
   *
   * @desc Read the reported scss files.
   *
   * @param {String} path
   */
  read(path: string): string {
    return fs.readFileSync(path, 'utf8')
  }

  /**
   * @method toJSON
   *
   * @desc Parse the read scss file to JSON.
   *
   * @param {String} file
   */
  toJSON(file: string): TColors {
    let data: TColors = {} as TColors

    if (file) {
      data = file
        .split(/\n/)
        .filter(s => !!s)
        .map(s => s.replace(';', '').split(':'))
        .map(([k, v]) => ({ ...data, [k]: v?.trim() }))
        .reduce((a, b) => ({ ...a, ...b }))
    }

    return data
  }

  /**
   * @method resolve
   *
   * @desc Merge complete files read and their dependencies.
   *
   * @param {String} path
   * @param {String} fileName
   */
  resolve(path: string, fileName: string): TColors {
    const file = this.read(`${path}/${fileName}`).split(';')

    const [dependencies] = file
      .filter(row => /@import/.test(row))
      .map(row => {
        const key = row.split(' ')[1].slice(1, -1)

        return this.toJSON(this.read(`${path}/_${key.replace('./', '')}.scss`))
      })

    const mergedDependencies = Object.entries(
      this.toJSON(file.filter(row => !/@import/.test(row)).join(';')),
    )
      .map(([key, value]) => ({
        [key]: /\$/.test(value) ? dependencies[value as TColorsNames] : value,
      }))
      .reduce((a, b) => ({ ...a, ...b }))

    return { ...dependencies, ...mergedDependencies }
  }

  /**
   * @method getColors
   *
   * @desc Obtains a color scheme according to the variant.
   *
   * @param {String} path
   * @param {String} variant
   */
  getColors(path: string | null, variant: string): TColors {
    return this.resolve(path || this.colorDirectory, `${variant}.scss`)
  }
}
