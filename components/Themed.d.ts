import { TextProps as DefaultTextProps, ViewProps as DefaultViewProps } from 'react-native';

export interface ThemeProps {
  lightColor?: string;
  darkColor?: string;
}

export interface TextProps extends ThemeProps, DefaultTextProps {}
export interface ViewProps extends ThemeProps, DefaultViewProps {}

export function Text(props: TextProps): JSX.Element;
export function View(props: ViewProps): JSX.Element; 