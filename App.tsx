/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Table from './src/components/Table';
import COLUMNS from './src/data/columns.json';
import DATA from './src/data/data.json';
import {OnCellChange} from './src/types';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

function App(): JSX.Element {
  const [data, setData] = useState(DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem('data');
        if (jsonValue) {
          setData(JSON.parse(jsonValue));
        }
      } catch (e) {
        // error reading value
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const saveData = async (newData: any) => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(newData));
    } catch (e) {
      // saving error
    }
  };

  const onCellChange: OnCellChange = async (row, column, value) => {
    let rowData = [...data[row]];
    rowData[column] = value;
    const newData = [...data];
    newData[row] = rowData;
    setData(newData);
    saveData(newData);
  };

  function renderCustomCell(
    text: string,
    _styles: StyleProp<ViewStyle> | any,
    row: number,
    column: number,
    onChange: (row: number, column: number, value: string) => Promise<void>,
  ) {
    return (
      <View
        style={[styles.customCellconatiner, {width: _styles?.width ?? 100}]}>
        <TextInput
          value={text}
          onChangeText={(updatedText: string) =>
            onChange?.(row, column, updatedText, 1)
          }
        />
      </View>
    );
  }

  const headerContainerStyle = {
    backgroundColor: '#74AA79',
    borderColor: '#365939',
  };
  const headerTextStyle = {
    color: '#101910',
  };
  const cellContainerStyle = {
    backgroundColor: '#b3d0b6',
    borderColor: 'black',
  };
  const cellTextStyle = {
    color: 'red',
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My table</Text>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Table
          onCellChange={onCellChange}
          columns={COLUMNS}
          data={data}
          rowsPerPage={4}
          renderCell={renderCustomCell ?? undefined}
          headerContainerStyle={headerContainerStyle}
          headerTextStyle={headerTextStyle}
          cellContainerStyle={cellContainerStyle}
          cellTextStyle={cellTextStyle}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 2,
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 4,
  },
  // custom cell container
  customCellconatiner: {
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
