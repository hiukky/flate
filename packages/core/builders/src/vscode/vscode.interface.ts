import { IBuilderCommon } from '../base'

export interface IVscodeBuilder extends IBuilderCommon {
  setFontStyles(): this
  createVariants(): string
}
