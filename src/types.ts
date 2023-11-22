import {PropsWithChildren, ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type ColumnProps = {
  title: string;
  styles?: StyleProp<ViewStyle> | any;
};

export type DataProps = any;

export type TableProps = PropsWithChildren<{
  columns: ColumnProps[];
  data: DataProps[];
  rowsPerPage: number;
  headerContainerStyle: StyleProp<ViewStyle>;
  headerTextStyle: StyleProp<TextStyle>;
  cellContainerStyle: StyleProp<ViewStyle>;
  cellTextStyle: StyleProp<TextStyle>;
  onCellChange: OnCellChange;
  renderCell?: RenderCell;
}>;

export type HeaderProps = PropsWithChildren<{
  columns: ColumnProps[];
  containerStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}>;

export type RowProps = PropsWithChildren<{
  data: DataProps[];
  columns: ColumnProps[];
  row: number;
  containerStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  renderCell?: RenderCell;
  onCellChange: OnCellChange;
}>;

export type OnCellChange = (
  row: number,
  column: number,
  value: string,
) => Promise<void>;

export type RenderCell = (
  text: string,
  styles: StyleProp<ViewStyle>,
  row: number,
  column: number,
  onChange: OnCellChange,
) => ReactNode;

export type RenderCellInternal = (
  text: string,
  styles: StyleProp<ViewStyle>,
  row: number,
  column: number,
  onChange: OnCellChange,
  containerStyle: StyleProp<ViewStyle>,
  textStyle: StyleProp<TextStyle>,
) => Promise<ReactNode>;
