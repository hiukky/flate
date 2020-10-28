import { IBuilderCommon, TBaseProps } from '../base'

export interface ITerminalBuilder extends IBuilderCommon {}

export type TExtension = 'conf' | 'yml'
export interface IProps extends TBaseProps {
  extension: TExtension
}
