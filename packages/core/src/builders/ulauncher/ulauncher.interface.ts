import { IBuilderCommon } from '../base'

export interface IUlauncherBuilder extends IBuilderCommon {}

export type TThemeType = 'main' | 'gtk'

export type TThemeShema = {
  [K: string]: string | Object
  variant: string
}
