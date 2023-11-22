import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {OnCellChange, RenderCell, RenderCellInternal, RowProps} from '../types';

function renderDefaultCell(
  text: string,
  _styles: StyleProp<ViewStyle> | any,
  row: number,
  column: number,
  onChange: OnCellChange,
  containerStyle: StyleProp<ViewStyle>,
  textStyle: StyleProp<TextStyle>,
) {
  return (
    <View
      key={`default-cell-${text}-${row}-${column}`}
      style={[
        styles.cellContainer,
        {width: _styles?.width ?? 100},
        containerStyle ?? {},
      ]}>
      <TextInput
        defaultValue={text}
        // value={text}
        style={[textStyle ?? {}]}
        onEndEditing={e => {
          onChange?.(row, column, e.nativeEvent.text);
        }}
      />
    </View>
  );
}

function Row({...props}: RowProps): JSX.Element {
  const {
    columns,
    data,
    renderCell = undefined,
    containerStyle,
    textStyle,
  }: RowProps = props;

  return (
    <View style={styles.container}>
      {data.map((dataItem, idx) => {
        const styles = columns[idx]?.styles ?? {};

        const defaultCellFunc: RenderCell = (
          _text,
          _styles,
          _row,
          _column,
          _onChange,
        ) =>
          renderDefaultCell(
            _text,
            _styles,
            _row,
            _column,
            _onChange,
            containerStyle,
            textStyle,
          );

        const renderItem: RenderCell | RenderCellInternal =
          renderCell ?? defaultCellFunc;

        return renderItem(
          dataItem,
          styles,
          props?.row,
          idx,
          props?.onCellChange,
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  // cell
  cellContainer: {
    borderWidth: 1,
    padding: 10,
  },
});

export default Row;
