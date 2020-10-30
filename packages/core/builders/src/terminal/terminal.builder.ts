import { BaseBuilder } from '../base'
import { ITerminalBuilder, IProps, TExtension } from './terminal.interface'

export class TerminalBuilder extends BaseBuilder implements ITerminalBuilder {
  private extension: TExtension

  constructor({ rootDir, extension }: IProps) {
    super({ rootDir })
    this.extension = extension || this.extensions.conf
  }

  /**
   * @method createVariants
   *
   * Create new theme variants.
   */
  createVariants(): string {
    this.theme.final[this.theme.stage.variant] = this.theme.stage.payload
    return 'created'
  }

  /**
   * @function merge
   *
   * Where the magic happens.
   *
   * @param theme
   */
  merge(theme: any): void {
    this.theme.stage = theme
    this.setColors().createVariants()
  }

  /**
   * @method stage
   *
   * Stage method where the finishing touches are applied.
   */
  stage(): void {
    this.listThemes.forEach(themeName => {
      const [variant] = themeName.split('.')

      this.merge({
        payload: this.getFile(
          `${this.rootDir.themes}/common/base.${this.extension}`,
        ),
        variant,
      })
    })
  }

  /**
   * @method compile
   *
   * Responsible for the construction.
   */
  compile(): string {
    this.stage()

    if (this.theme.final) {
      Object.entries(this.theme.final).map(([name, theme]) =>
        this.createFile({
          path: this.rootDir.build,
          file: theme,
          fileName: `${name}.${this.extension}`,
        }),
      )
    }

    return 'done'
  }
}
