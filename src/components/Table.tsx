import React, {useMemo, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './Header';
import {TableProps} from '../types';
import Row from './Row';

function Table({...props}: TableProps): JSX.Element {
  const {
    columns,
    data,
    rowsPerPage = 5,
    onCellChange,
    renderCell,
    headerContainerStyle = {},
    headerTextStyle = {},
    cellContainerStyle = {},
    cellTextStyle = {},
  } = props;

  const [pageIndex, setPageIndex] = useState(0);

  const visibleData = useMemo(() => {
    let init = rowsPerPage * pageIndex;
    return data.slice(init, init + rowsPerPage);
  }, [data, pageIndex, rowsPerPage]);

  const onNext = () => {
    if (data.length > (pageIndex + 1) * rowsPerPage) {
      setPageIndex(a => a + 1);
    }
  };

  const onPrev = () => {
    pageIndex > 0 && setPageIndex(a => a - 1);
  };

  const PAGINATION = (
    <View style={styles.paginationContainer}>
      <TouchableOpacity onPress={onPrev} style={styles.next}>
        <Text style={styles.nextText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>Page: {pageIndex + 1}</Text>
      <TouchableOpacity onPress={onNext} style={styles.next}>
        <Text style={styles.nextText}>+</Text>
      </TouchableOpacity>
      <Text style={[styles.pageText, {flex: 1, textAlign: 'right'}]}>
        Total Pages: {Math.ceil(data.length / rowsPerPage)}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {PAGINATION}
      <ScrollView style={{flex: 1}} horizontal={true} bounces={false}>
        <View>
          <View>
            <Header
              columns={columns}
              containerStyle={headerContainerStyle}
              textStyle={headerTextStyle}
            />
          </View>
          <FlatList
            data={visibleData ?? []}
            renderItem={({item, index}) => {
              return (
                <Row
                  onCellChange={onCellChange}
                  row={rowsPerPage * pageIndex + index}
                  data={item}
                  columns={columns}
                  renderCell={renderCell}
                  containerStyle={cellContainerStyle}
                  textStyle={cellTextStyle}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  next: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 36,
    minHeight: 36,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageText: {
    fontSize: 18,
  },
  nextText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  // pagination
  paginationContainer: {flexDirection: 'row', alignItems: 'center', margin: 8},
});

export default Table;
