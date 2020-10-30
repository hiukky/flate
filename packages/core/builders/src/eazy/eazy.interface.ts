import { IBuilderCommon, TBaseProps } from '../base'

export interface IEazyBuilder extends IBuilderCommon {}

export type TExtension = 'conf' | 'yml'
export interface IProps extends TBaseProps {
  extension: TExtension
}
