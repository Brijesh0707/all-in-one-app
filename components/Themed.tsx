import { Text as DefaultText, View as DefaultView } from 'react-native';
import type { TextProps, ViewProps } from './Themed.d';

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = lightColor ?? '#000';
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = lightColor ?? '#fff';
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
} 