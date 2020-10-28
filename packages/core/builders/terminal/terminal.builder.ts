import { BaseBuilder } from '../base'
import { ITerminalBuilder } from './terminal.interface'

export class TerminalBuilder extends BaseBuilder implements ITerminalBuilder {
  createVariants(): string {
    throw new Error('Method not implemented.')
  }

  merge(theme: any): void {
    throw new Error('Method not implemented.')
  }

  stage(): void {
    throw new Error('Method not implemented.')
  }

  compile(): string {
    throw new Error('Method not implemented.')
  }
}
