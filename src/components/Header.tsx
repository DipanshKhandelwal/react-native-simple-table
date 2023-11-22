import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HeaderProps} from '../types';

function Header({...props}: HeaderProps): JSX.Element {
  const {columns, containerStyle = {}, textStyle = {}}: HeaderProps = props;

  return (
    <View style={styles.container}>
      {columns.map((col, idx) => (
        <View
          key={`header-${idx}-${col.title}`}
          style={[
            styles.headerCellContainer,
            {width: col?.styles?.width ?? 100},
            containerStyle,
          ]}>
          <Text style={[textStyle]}>{col.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flexDirection: 'row',
  },
  headerCellContainer: {
    borderWidth: 1,
    padding: 10,
  },
});

export default Header;
